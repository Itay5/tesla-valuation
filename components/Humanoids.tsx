"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HumanoidsProps {
  units: number;
  onUnitsChange: (value: number) => void;
  avgCost: number;
  onAvgCostChange: (value: number) => void;
  avgSellingPrice: number;
  onAvgSellingPriceChange: (value: number) => void;
}

export function Humanoids({
  units,
  onUnitsChange,
  avgCost,
  onAvgCostChange,
  avgSellingPrice,
  onAvgSellingPriceChange,
}: HumanoidsProps) {
  const totalRevenue = units * avgSellingPrice;
  const totalProfit = units * (avgSellingPrice - avgCost);

  return (
    <Card className="border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
        <CardTitle className="text-2xl font-bold text-gray-800">Humanoids (Optimus) - The Ultimate Golden Goose</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="units">Number of Units</Label>
            <Input
              id="units"
              type="number"
              value={units}
              onChange={(e) => onUnitsChange(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avgCost">Average Cost per Unit ($)</Label>
            <Input
              id="avgCost"
              type="number"
              value={avgCost}
              onChange={(e) => onAvgCostChange(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avgSellingPrice">Average Selling Price ($)</Label>
            <Input
              id="avgSellingPrice"
              type="number"
              value={avgSellingPrice}
              onChange={(e) => onAvgSellingPriceChange(Number(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div>
            <p className="font-semibold text-gray-600">Total Humanoids Revenue:</p>
            <p className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Total Humanoids Profit:</p>
            <p className="text-2xl font-bold text-purple-600">${totalProfit.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}