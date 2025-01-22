"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
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
    "http://localhost:3000/pay-money" // Default URL; make sure to pass this from the environment
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState<number>(0);

  const handleOnClick = async () => {
    try {
      const res = await createOnRampTransaction(value, provider);
      console.log("RES:", res);
      console.log("res.token--->", res?.transaction?.token);
      if (res?.transaction?.token) {
        // Redirect to the bank with the token in the query string
        window.location.href = `${redirectUrl}?token=${res.transaction.token}`;
        console.log(`Redirecting to: ${redirectUrl}?token=${res.transaction.token}`);

      } else {
        alert("Failed to create transaction. Please try again.");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Enter Amount"}
          onChange={(val) => {
            setValue(Number(val));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            const selectedBank = SUPPORTED_BANKS.find((x) => x.name === value);
            setRedirectUrl(selectedBank?.redirectUrl || "");
            setProvider(selectedBank?.name || "");
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button onClick={handleOnClick}>Add Money</Button>
        </div>
      </div>
    </Card>
  );
};
