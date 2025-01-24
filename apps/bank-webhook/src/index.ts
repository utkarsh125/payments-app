import db from "@repo/db/client";
import express from "express";
const app = express();

app.use(express.json());

// app.post("/hdfcWebhook", async (req, res) => {
//     // Log the incoming payload for debugging
//     console.log("Incoming Webhook Payload: ", req.body);

//     // Extract and structure payment information
//     const paymentInformation: {
//         token: string;
//         userId: string;
//         amount: string;
//         status: string;
//     } = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount,
//         status: req.body.status, // Include the status field
//     };

//     // Log status for clarity
//     // console.log(`Status received: ${paymentInformation.status}`);
//     // console.log(`Processing transaction for user ID: ${paymentInformation.userId}`);


//     console.log("Processed webhook payment information: ", paymentInformation);

    
//     // Conditional logging for balance updates
//     if (paymentInformation.status === "success") {
//         console.log("Updating balance for user:", paymentInformation.userId);
//     } else {
//         console.log("Skipping balance update for failed transaction.");
//     }

//     try {
//         // Start a database transaction
//         await db.$transaction([
//             // Update balance only if the status is 'success'
//             ...(paymentInformation.status === "success"
//                 ? [
//                       db.balance.updateMany({
//                           where: {
//                               userId: Number(paymentInformation.userId),
//                           },
//                           data: {
//                               amount: {
//                                   increment: Number(paymentInformation.amount),
//                               },
//                           },
//                       }),
//                   ]
//                 : []), // Skip balance update for failed transactions

//             // Always update the transaction status in the database
//             db.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token,
//                 },
//                 data: {
//                     status: paymentInformation.status === "success" ? "Success" : "Failure", // Reflect the correct status
//                 },
//             }),
//         ]);

//         // Respond to the webhook sender
//         res.json({
//             message: `Transaction processed with status: ${paymentInformation.status}`,
//         });
//         console.log(
//             `Transaction ${paymentInformation.token} processed successfully with status: ${paymentInformation.status}`
//         );
//     } catch (error) {
//         console.error("Error while processing webhook:", error);
//         res.status(500).json({
//             message: "Error while processing webhook",
//         });
//     }
// });

// Start the server

// app.post("/hdfcWebhook", async (req, res) => {
//     // Log the incoming payload
//     console.log("Incoming Webhook Payload:", req.body);

//     const paymentInformation: {
//         token: string;
//         userId: string;
//         amount: string;
//         paymentStatus: string;
//     } = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount,
//         paymentStatus: req.body.paymentStatus, // Correctly map this field
//     };

//     console.log("Processed Webhook Payment Information:", paymentInformation);
//     console.log("Payment Status Received:", paymentInformation.paymentStatus);


//     try {
//         await db.$transaction([
//             ...(paymentInformation.paymentStatus === "success"
//                 ? [
//                       db.balance.updateMany({
//                           where: {
//                               userId: Number(paymentInformation.userId),
//                           },
//                           data: {
//                               amount: {
//                                   increment: Number(paymentInformation.amount),
//                               },
//                           },
//                       }),
//                   ]
//                 : []),
//             db.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token,
//                 },
//                 data: {
//                     status:
//                         paymentInformation.paymentStatus === "success"
//                             ? "Success"
//                             : "Failure",
//                 },
//             }),
//         ]);

//         res.json({
//             message: `Transaction processed with status: ${paymentInformation.paymentStatus}`,
//         });
//     } catch (error) {
//         console.error("Error while processing webhook:", error);
//         res.status(500).json({
//             message: "Error processing transaction",
//         });
//     }
// });

// app.post("/hdfcWebhook", async (req, res) => {
//     const paymentInformation: {
//         token: string;
//         userId: string;
//         amount: string;
//         paymentStatus: string;
//     } = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount,
//         paymentStatus: req.body.paymentStatus,
//     };

//     console.log("Incoming Webhook Payload:", paymentInformation);

//     try {
//         // Check if the balance entry exists
//         const existingBalance = await db.balance.findFirst({
//             where: { userId: Number(paymentInformation.userId) },
//         });
//         console.log("Existing Balance: ", existingBalance);

//         if (!existingBalance && paymentInformation.paymentStatus === "success") {
//             console.log("No existing balance found. Creating new balance entry...");
//             await db.balance.create({
//                 data: {
//                     userId: Number(paymentInformation.userId),
//                     amount: Number(paymentInformation.amount),
//                     locked: 0, // Default value for locked balance
//                 },
//             });
//         }

//         const transactionResult = await db.$transaction([
//             ...(paymentInformation.paymentStatus === "success"
//                 ? [
//                       db.balance.updateMany({
//                           where: {
//                               userId: Number(paymentInformation.userId),
//                           },
//                           data: {
//                               amount: {
//                                   increment: Number(paymentInformation.amount),
//                               },
//                           },
//                       }),
//                   ]
//                 : []),
//             db.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token,
//                 },
//                 data: {
//                     status:
//                         paymentInformation.paymentStatus === "success"
//                             ? "Success"
//                             : "Failure",
//                 },
//             }),
//         ]);

//         console.log("Transaction Result:", transactionResult);

//         res.json({
//             message: `Transaction processed with status: ${paymentInformation.paymentStatus}`,
//         });
//     } catch (error) {
//         console.error("Error while processing webhook:", error);
//         res.status(500).json({
//             message: "Error processing transaction",
//         });
//     }
// });

// app.post("/hdfcWebhook", async (req, res) => {
//     const paymentInformation: {
//         token: string;
//         userId: string;
//         amount: string;
//         paymentStatus: string;
//     } = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount,
//         paymentStatus: req.body.paymentStatus,
//     };

//     console.log("Incoming Webhook Payload:", paymentInformation);

//     try {
//         // Check if the balance entry exists
//         const existingBalance = await db.balance.findFirst({
//             where: { userId: Number(paymentInformation.userId) },
//         });
//         console.log("Existing Balance:", existingBalance);

//         if (!existingBalance && paymentInformation.paymentStatus === "success") {
//             console.log("No existing balance found. Creating new balance entry...");
//             const newBalance = await db.balance.create({
//                 data: {
//                     userId: Number(paymentInformation.userId),
//                     amount: 0, // Initialize with 0
//                     locked: 0,
//                 },
//             });
//             console.log("New Balance Created:", newBalance);
//         }

//         // Perform the balance update and transaction status update
//         const transactionResult = await db.$transaction([
//             ...(paymentInformation.paymentStatus === "success"
//                 ? [
//                       db.balance.updateMany({
//                           where: {
//                               userId: Number(paymentInformation.userId),
//                           },
//                           data: {
//                               amount: {
//                                   increment: Number(paymentInformation.amount),
//                               },
//                           },
//                       }),
//                   ]
//                 : []),
//             db.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token,
//                 },
//                 data: {
//                     status:
//                         paymentInformation.paymentStatus === "success"
//                             ? "Success"
//                             : "Failure",
//                 },
//             }),
//         ]);

//         console.log("Transaction Result:", transactionResult);

//         res.json({
//             message: `Transaction processed with status: ${paymentInformation.paymentStatus}`,
//         });
//     } catch (error) {
//         console.error("Error while processing webhook:", error);
//         res.status(500).json({
//             message: "Error processing transaction",
//         });
//     }
// });

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
        paymentStatus: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount,
        paymentStatus: req.body.paymentStatus,
    };

    console.log("Incoming Webhook Payload:", paymentInformation);

    try {
        // Check if the balance entry exists
        const existingBalance = await db.balance.findFirst({
            where: { userId: Number(paymentInformation.userId) },
        });
        console.log("Existing Balance:", existingBalance);

        if (!existingBalance && paymentInformation.paymentStatus === "success") {
            console.log("No existing balance found. Creating new balance entry...");
            const newBalance = await db.balance.create({
                data: {
                    userId: Number(paymentInformation.userId),
                    amount: Number(paymentInformation.amount), // Initialize with the transaction amount
                    locked: 0,
                },
            });
            console.log("New Balance Created:", newBalance);
        } else if (paymentInformation.paymentStatus === "success") {
            console.log("Updating existing balance for user:", paymentInformation.userId);
            await db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId),
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount),
                    },
                },
            });
        }

        // Update transaction status
        const transactionResult = await db.onRampTransaction.updateMany({
            where: {
                token: paymentInformation.token,
            },
            data: {
                status: paymentInformation.paymentStatus === "success" ? "Success" : "Failure",
            },
        });

        console.log("Transaction Result:", transactionResult);

        res.json({
            message: `Transaction processed with status: ${paymentInformation.paymentStatus}`,
        });
    } catch (error) {
        console.error("Error while processing webhook:", error);
        res.status(500).json({
            message: "Error processing transaction",
        });
    }
});

app.listen(3003, () => {
    console.log("Bank webhook operational on port 3003");
});
