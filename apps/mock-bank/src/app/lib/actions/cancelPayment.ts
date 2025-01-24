"use server";

import axios from "axios";
import jwt from "jsonwebtoken";

export async function cancelPayment(token: string | undefined) {
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

    // Prepare the payload for webhook
    const payload = {
      token,
      user_identifier: decodedData.userId,
      amount: decodedData.amount,
      status: "failure",
    };

    // Send the cancellation request to the webhook

    console.log("Sending cancel payload to webhook:", payload);

    const response = await axios.post(process.env.BANK_WEBHOOK || "", payload);
    // console.log("cancelPayment.ts hook: ", response);
    if (response.status !== 200) {
      console.error("Webhook returned an error:", response.data);
      return {
        status: response.status,
        message: "Webhook call failed",
      };
    }

    return {
      status: 200,
      message: "Cancellation successful",
    };
  } catch (error) {
    // Log token verification errors
    console.error("Verification Error:", error);

    return {
      status: 401,
      message: "Token is invalid or expired",
    };
  }
}
