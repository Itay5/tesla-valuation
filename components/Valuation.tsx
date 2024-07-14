"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ValuationProps {
  totalProfit: number;
}

export function Valuation({ totalProfit }: ValuationProps) {
  const [peRatio, setPeRatio] = useState(30);

  const estimatedValuation = totalProfit * peRatio;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-1">
        <Label htmlFor="peRatio" className="text-sm font-medium">P/E:</Label>
        <Input
          id="peRatio"
          type="number"
          value={peRatio}
          onChange={(e) => setPeRatio(Number(e.target.value) || 0)}
          className="w-16 h-8 text-sm"
        />
      </div>
      <p className="text-2xl font-bold text-green-600">${estimatedValuation.toLocaleString()}</p>
    </div>
  );
}