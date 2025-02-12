import { NextAuthOptions } from "next-auth";
import   CredentialsProvider  from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
 export const authOptions: NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : {label : "Email" , type : "text"},
                password :{label : "password" , type : "password"}
            },
            async authorize(){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing email ot password");
                }
                try {
                    await connectToDatabase()
                    User.findOne({email : this.credentials.email})
                }catch(error)
            }
        }),
    ],
    
 }