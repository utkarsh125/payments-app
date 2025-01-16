"use server"

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction (amount: number, provider: string) {

    //check what the ID of the user is:
    const session = await getServerSession(authOptions); //WHY?
    const token = Math.random().toString();
    const userId = session.user.id;

    if(!userId){
        return {
            message: "User not logged in"
        }
    }

    // await prisma.onRampTransaction.create({
    //     data: {
    //         userId: Number(userId),
    //         amount: amount,
    //         status: "Processing",
    //         startTime: new Date(),
    //         provider,
    //         token: token
    //     }
    // })

    // return {
    //     message: "On ramp transaction added."
    // }

    try {
        const transaction = await prisma.onRampTransaction.create({
            data: {
                userId: Number(userId),
                amount: amount*100,
                status: "Processing",
                startTime: new Date(),
                provider,
                token: token
            }
        })

        console.log("Created Transaction: ", transaction);
    
        return {
            message: "On ramp transaction added.",
            transaction
        }
    } catch (error) {
        console.error("Error while creating transaction", error);
        throw error;
    }
}