'use client';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [upiUrl, setUpiUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const upiId = process.env.NEXT_PUBLIC_UPI_ID;
    const receiverName = process.env.NEXT_PUBLIC_RECEIVER_NAME;
    
    if (!upiId || !receiverName) {
      alert('UPI configuration is missing');
      return;
    }
    
    const url = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(receiverName)}&am=${amountNum}&cu=INR`;
    
    setUpiUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">UPI Payment Generator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="amount">
              Enter Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="e.g. 100"
              step="0.01"
              min="1"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Generate QR Code
          </button>
        </form>

        {upiUrl && (
          <div className="mt-8 text-center">
            <div className="mb-4">
              <QRCodeSVG
                value={upiUrl}
                size={256}
                level="H"
                includeMargin={true}
                className="mx-auto p-2 bg-white rounded-lg"
              />
            </div>
            
            <p className="mt-4 text-sm text-gray-600">
              Scan the QR code with any UPI app to make payment
            </p>

            <div className="mt-4">
              <a
                href={upiUrl}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Click here to open directly in UPI app
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}