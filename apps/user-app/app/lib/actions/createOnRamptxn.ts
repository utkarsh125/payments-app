"use server";

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string) {
  // Check the ID of the user:
  const session = await getServerSession(authOptions); // Why? To identify the user
  const userId = session?.user?.id;

  if (!userId) {
    return {
      message: "User not logged in",
    };
  }

  // Generate a secure JWT token
  const token = jwt.sign(
    { userId, amount },
    process.env.JWT_SECRET || "default_secret", //Future Setup Node: Ensure JWT_SECRET is defined in your .env file
    { expiresIn: "1h" } // Set the token expiration time
  );

  try {
    // Store the transaction in the database
    const transaction = await prisma.onRampTransaction.create({
      data: {
        userId: Number(userId),
        amount: amount * 100,
        status: "Processing",
        startTime: new Date(),
        provider,
        token, // Save the generated JWT token
      },
    });

    console.log("Created Transaction: ", transaction);

    return {
      message: "On ramp transaction added.",
      transaction,
    };
  } catch (error) {
    console.error("Error while creating transaction", error);
    throw error;
  }
}
