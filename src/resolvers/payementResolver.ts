import { isClient } from '../middleware/isClient'
import { stripe } from '../stripe'
import { MyContext } from '../types'
import { Ctx, Mutation, UseMiddleware } from 'type-graphql'
import { Client } from '../entity/Client'
import { Run, RunStatus, RunPaymentStatus } from '../entity/Run'
import 'dotenv/config'


export class PaymentResolver {
    
  @Mutation(() => String)
  @UseMiddleware(isClient)
  async createPayment(
    @Ctx() {req}: MyContext,
    //@Arg('source', () => String) source: string
  ){


    const client = await Client.findOne({where: {id: req.session.userId}})

    console.log(client)

    if (!client) {
      throw new Error("Something happened and we couldnt find a client")
    }

    // const intent = await stripe.paymentIntents.create({
    //   amount: 1,
    //   currency: 'brl',
    //   metadata: {integration_check: 'accept_a_payment'}
    // })

    // return intent.client_secret

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // price_data: {
          //   currency: 'brl',
          //   product_data: {
          //     name: 'test_run'
          //   },
          //   unit_amount: 1,
          // },
          // TODO: replace this with the `price` of the product you want to sell
          price: `${process.env.RUN_BASIC_PRICE_ID}`,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.MY_DOMAIN}/payment_success`,
      cancel_url: `${process.env.MY_DOMAIN}/payment_failed`,
    });
    return session.url
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isClient)
  async successfulPayment(
    @Ctx() {req}: MyContext,
  ):Promise<Boolean>{
    const client = await Client.findOne({where: {id: req.session.userId}})

    if (!client) {
      throw new Error("Something happened and we couldnt find a client")
    }

    const run = await Run.findOne({
      where:{
        client: client,
        runStatus: RunStatus.CLOSED,
        runPaymentStatus: RunPaymentStatus.NOT_PAID
      }
    })

    if (!run) {
      throw new Error("Run in question does not exist")
    }

    run.runPaymentStatus = RunPaymentStatus.PAID

    run.save
    return true
  }
}