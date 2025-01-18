import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";

interface Balance {
    amount: number;
    locked: number;
}

interface OnRampTransaction {
    time: Date;
    amount: number;
    status: string;
    provider: string;
}

async function getBalance(): Promise<Balance> {
    const session = await getServerSession(authOptions);
    console.log(session.user.id);
    console.log(session);
    const balance = await prisma.balance.findFirst({
        where: {
            // userId: Number(session?.user?.id)
            userId: 4
        }
    });
    
    console.log("Balance in db ", balance);
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions(): Promise<OnRampTransaction[]> {
    const session = await getServerSession(authOptions);

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map((t: { startTime: Date; amount: number; status: string; provider: string }) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
}

export default async function () {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    console.log(balance);
    console.log(transactions);

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}