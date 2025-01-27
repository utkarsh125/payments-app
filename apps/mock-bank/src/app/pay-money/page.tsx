'use client';

import { Suspense, useEffect, useState } from 'react';

import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { TextInput } from '@repo/ui/textinput';
import { cancelPayment } from '../lib/actions/cancelPayment';
import { useSearchParams } from 'next/navigation';
import { validatePayment } from '../lib/actions/validatePayment';
import { verifyToken } from '../lib/actions/verifyToken';

const PayMoneyContent = () => {
  const [accountNumber, setAccountNumber] = useState(1234567890);
  const [password, setPassword] = useState('netbanking-password');
  const [userId, setUserId] = useState('');
  console.log(userId);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    async function fetchDecodedCode() {
      if (!token) {
        setError('Token is required');
        return;
      }

      setLoading(true);
      try {
        const res = await verifyToken(token);
        if (res.status === 200) {
          const decoded = res.data;
          setUserId(decoded?.userId ?? '');
          setAmount(decoded?.amount ?? 0);
        } else {
          throw new Error('Invalid Token');
        }
      } catch (err) {
        setError('Invalid token');
        console.log('Error verifying token:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDecodedCode();
  }, [token]);

  const handleCancel = async () => {
    setLoading(true);
    try {

      if(!token){
        throw new Error('Token is required');
      }
      await cancelPayment(token);
      window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL || '';
    } catch (err) {
      setError('Error during cancellation');
      console.error('Cancel payment failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {

      if(!token){
        throw new Error('Token is required');
      }
      await validatePayment(token);
      window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL || '';
    } catch (err) {
      setError('Error during payment validation');
      console.error('Payment validation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="pb-6 text-center">
        <h1 className="text-2xl font-semibold text-blue-600">Mock Netbanking Page</h1>
      </div>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h2>
        <p className="text-sm text-gray-600 mb-6">
          You are about to pay <span className="font-bold text-blue-600">₹{amount}</span> to
          Payments Wallet.
        </p>
        
        
        <Card title={'Netbanking Portal'} className="p-6 bg-gray-50 border border-gray-300">
          <div className="mb-4">
            
            <TextInput
              label={'Account Number'}
              placeholder={'Enter your account number'}

              value={accountNumber.toString()}
              onChange={(val) => setAccountNumber(Number(val))}
              disabled={loading}
              className="bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label={'Netbanking Password'}
              placeholder={'Enter your password'}

              value={password}
              onChange={(val) => setPassword(val)}
              disabled={loading}
              className="bg-gray-100"
              type="password"
            />
          </div>
          <div className="mt-6 flex flex-col-reverse space-y-4">
            {loading ? (
              <p className="text-blue-500 text-center animate-pulse">Processing...</p>
            ) : (
              <>
                <Button
                  onClick={handleCancel}
                  disabled={loading}
                  className=" px-4 py-2 rounded-lg hover:bg-red-500 text-gray-100"
                >
                  <p className='text-red-500 hover:text-white'>Cancel</p>
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-100"
                >
                  <p className='text-blue-500'>
                    Pay Now
                  </p>
                </Button>
              </>
            )}
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </Card>
      </div>

      <div className="w-full text-center mt-6 text-sm text-gray-500">
        <p>This is a mock netbanking portal completely for testing purposes.</p>
        <p>Testers can click &apos;Pay Now&apos; to complete the transaction.</p>
      </div>
    </div>
  );
};

export default function PayMoney() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PayMoneyContent />
    </Suspense>
  );
}
