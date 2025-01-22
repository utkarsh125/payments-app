"use server";

import jwt from "jsonwebtoken";

export async function verifyToken(token: string | undefined) {
    console.log("Backend Token Received:", token);

    if (!token) {
        return {
            status: 400,
            message: "Token is required",
        };
    }

    try {
        // Verify and decode the token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET || "") as {
            userId: string;
            amount: number;
        };

        return {
            status: 200,
            data: decodedData,
        };
    } catch (error) {
        // Log token verification errors
        console.error("Token verification error:", error);

        return {
            status: 401,
            message: "Invalid or expired token",
        };
    }
}
