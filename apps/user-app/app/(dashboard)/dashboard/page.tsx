// apps/user-app/app/(dashboard)/dashboard/page.tsx
import { Suspense } from 'react';

// Create a server component to fetch data
async function BalanceData() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  
  return (
    <>
      <div>
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        <div className="pt-4">
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </>
  );
}

// Main page component
export default function DashboardPage() {
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <BalanceData />
        </Suspense>
      </div>
    </div>
  );
}