import { validateEmail } from "./validateEmail"

export const validateRegister = (userName: String, email: string, password: string) => {
    if(userName.length <= 2){
        return [{
                field: 'username',
                message: "length must be greater than 2"
            }]
    }

    if(userName.includes('@')){
        return [{
                field: 'username',
                message: "Cannot includes an @"
            }]
    }

    if(!validateEmail(email)){
        return [{
                field: 'email',
                message: "Invalid Email"
            }]
    }

    if(password.length <= 3){
        return [{
                field: 'password',
                message: "password must be greater than 2"
            }]
    }

    return null
}