import { isAuth } from "../middleware/isAuth";
import { Query, UseMiddleware } from "type-graphql";

export class HelloResolver {
    @Query(() => String)
    @UseMiddleware(isAuth)
    hello(): String{
        return 'Hello World'
    }
}