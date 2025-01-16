"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";
import { useState } from "react";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          {/* <Button onClick={async () => {
                await createOnRampTransaction(amount*100, provider)
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button> */}

          <Button
            onClick={async () => {
              try {
                const result = await createOnRampTransaction(
                  amount,
                  provider
                );
                if (result.message === "User not logged in") {
                  // Handle not logged in case
                  alert("Please log in to continue");
                  return;
                }
                // Only redirect if transaction was successful
                window.location.href = redirectUrl || "";
              } catch (error) {
                console.error("Error creating transaction:", error);
                alert("Failed to process transaction");
              }
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
