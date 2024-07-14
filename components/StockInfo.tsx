import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StockInfoProps {
  totalValuation: number;
}

export function StockInfo({ totalValuation }: StockInfoProps) {
  const [shareCount, setShareCount] = useState<number>(0);

  const outstandingShares = 3.19e9; // 3.19 billion
  const stockPrice = totalValuation / outstandingShares;
  const totalValue = stockPrice * shareCount;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tesla Stock Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="stockPrice">Calculated Stock Price</Label>
            <div className="text-2xl font-bold text-green-600">
              ${stockPrice.toFixed(2)}
            </div>
          </div>
          <div>
            <Label htmlFor="shareCount">Your Share Count</Label>
            <Input
              id="shareCount"
              type="number"
              value={shareCount}
              onChange={(e) => setShareCount(Number(e.target.value) || 0)}
              placeholder="Enter number of shares"
            />
          </div>
          <div>
            <Label>Total Value of Your Shares</Label>
            <div className="text-2xl font-bold text-blue-600">
              ${totalValue.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}