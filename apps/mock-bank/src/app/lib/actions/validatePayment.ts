"use server";

import axios from "axios";
import jwt from "jsonwebtoken";

export async function validatePayment(token: string | undefined) {
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

    // Prepare payload for webhook
    const payload = {
      token,
      user_identifier: decodedData.userId,
      amount: decodedData.amount,
      paymentStatus: "success",
    };

    console.log("Sending payload to webhook:", payload.paymentStatus);

    // Send the validation request to the webhook
    const response = await axios.post(process.env.BANK_WEBHOOK || "", payload);
    console.log("Webhook Response FOR Validation: ", response.data, response.status);
    if (response.status !== 200) {
      console.error("Webhook returned an error:", response.data);
      return {
        status: response.status,
        message: "Webhook call failed",
      };
    }

    return {
      status: 200,
      message: "Success",
    };
  } catch (error) {
    // Log token verification errors
    console.error("Error during payment validation:", error);

    return {
      status: 401,
      message: "Token is invalid or expired",
    };
  }
}
