import db from "@repo/db/client";
import express from "express";
const app = express();

app.post('/bankWebhook', async(req, res) => {
    //TODO: Add zod validation here
    //Check if this request actually came from a bank, use a webhook secret here
    
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    await db.balances.update({
        where: {
            userId: paymentInformation.userId
        },
        data:{
            amount:{
                increment: paymentInformation.amount
            }
        }
    })
    
    //UPDATE THE BALANCE IN DB, ADD TRANSACTION

    //ADD TRANSACTION
    await db.onRampTransaction.update({
        where:{
            token: paymentInformation.token,
        },
        data:{
            status: "Success"
        }
    })

    res.json({//sending back 411 means a problem on server side so refund the money
        message: "Captured", //Captured the request
    })
    


})
//balances
//onRampTransaction