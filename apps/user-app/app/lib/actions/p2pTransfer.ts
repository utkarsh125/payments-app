"use server";

import { Prisma } from "@prisma/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    console.log("p2pTransfer for CI/CD");

    if (!from) {
        return {
            status: "error",
            message: "Error while sending. Please log in again.",
        };
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to,
        },
    });

    if (!toUser) {
        return {
            status: "error",
            message: "User not found",
        };
    }

    try {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // Lock both sender and receiver balances
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" IN (${Number(from)}, ${toUser.id}) FOR UPDATE`;

            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
            });

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient funds");
            }

            // Deduct from sender's balance
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
            });

            // Add to receiver's balance
            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
            });

            // Log the transaction
            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount,
                    timestamp: new Date(),
                },
            });
        });

        return {
            status: "success",
            message: "Money sent successfully",
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        if (errorMessage === "Insufficient funds") {
            return {
                status: "error",
                message: "Insufficient Balance in wallet. Do you want to top-up now?",
                redirect: "/(dashboard)/transfer",
            };
        }

        return {
            status: "error",
            message: errorMessage,
        };
    }
}
