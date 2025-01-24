import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
    transactions,
}: {
    transactions: {
        time: Date;
        amount: number;
        status: string;
        provider: string;
    }[];
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent Transactions
                </div>
            </Card>
        );
    }

    const sortedTransactions = [...transactions].sort(
        (a, b) => b.time.getTime() - a.time.getTime()
    );

    console.log("Transaction received: ", transactions);

    const normalizeStatus = (status: string) =>
        status.toLowerCase() === "success" ? "Success" : "Failure";

    return (
        <Card title="Recent Transactions">
            <div className="pt-2 divider-line">
                {sortedTransactions.map((t, index) => (
                    <div key={index} className="flex justify-between">
                        <div>
                            <div className="text-sm">Received INR</div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                            <p
                                className={`text-xs text-right ${
                                    normalizeStatus(t.status) === "Success"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {normalizeStatus(t.status)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
