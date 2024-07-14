"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FSDProps {
  fleetSize: number;
  onFleetSizeChange: (value: number) => void;
  potentialRevenuePerVehicle: number;
  onPotentialRevenuePerVehicleChange: (value: number) => void;
  usageFactor: number;
  onUsageFactorChange: (value: number) => void;
  profitFactor: number;
  onProfitFactorChange: (value: number) => void;
}

export function FSD({
  fleetSize,
  onFleetSizeChange,
  potentialRevenuePerVehicle,
  onPotentialRevenuePerVehicleChange,
  usageFactor,
  onUsageFactorChange,
  profitFactor,
  onProfitFactorChange,
}: FSDProps) {
  const totalRevenue = fleetSize * potentialRevenuePerVehicle * (usageFactor / 100);
  const totalProfit = totalRevenue * (profitFactor / 100);

  return (
    <Card className="border-4 border-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-yellow-100 to-pink-100">
        <CardTitle className="text-2xl font-bold text-gray-800">Full Self-Driving (FSD) - The Golden Goose</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fleetSize">Total Fleet Size</Label>
            <Input
              id="fleetSize"
              type="number"
              value={fleetSize}
              onChange={(e) => onFleetSizeChange(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="potentialRevenue">Potential Revenue per Vehicle/Year ($)</Label>
            <Input
              id="potentialRevenue"
              type="number"
              value={potentialRevenuePerVehicle}
              onChange={(e) => onPotentialRevenuePerVehicleChange(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="usageFactor">Usage Factor (%)</Label>
            <Input
              id="usageFactor"
              type="number"
              value={usageFactor}
              onChange={(e) => onUsageFactorChange(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profitFactor">Profit Factor (%)</Label>
            <Input
              id="profitFactor"
              type="number"
              value={profitFactor}
              onChange={(e) => onProfitFactorChange(Number(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div>
            <p className="font-semibold text-gray-600">Total FSD Revenue:</p>
            <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Total FSD Profit:</p>
            <p className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}