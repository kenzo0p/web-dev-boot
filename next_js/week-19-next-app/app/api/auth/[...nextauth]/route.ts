import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    providers : [
        CredentialsProvider({
            name :"Email",
            credentials : {
                username : {label : "username"  , type : "text" },
                password : {label : "password" , type : "password"}
            },
            async authorize(){
                return {username :"om",
                    id : "1",
                    password : "123455"
                }
            }
        })
    ],
    secret:"Process.env.NEXTAUTH_SECRET"
})

export const GET = handler;
export const POST = handler;
