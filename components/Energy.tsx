"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export interface EnergyProduct {
  name: string;
  units: number;
  capacity: number; // in kWh for Powerwall, MWh for Megapack
}

interface EnergyProps {
  products: EnergyProduct[];
  onProductChange: (updatedProducts: EnergyProduct[]) => void;
  profitPercentage: number;
  onProfitPercentageChange: (value: number) => void;
  revenuePerGWh: number;
  onRevenuePerGWhChange: (value: number) => void;
}

export function Energy({ 
  products, 
  onProductChange, 
  profitPercentage, 
  onProfitPercentageChange,
  revenuePerGWh,
  onRevenuePerGWhChange
}: EnergyProps) {
  const handleInputChange = (index: number, field: keyof EnergyProduct, value: string) => {
    const updatedProducts = products.map((product, i) => 
      i === index ? { ...product, [field]: parseFloat(value) || '' } : product
    );
    onProductChange(updatedProducts);
  };

  const calculateGWh = (product: EnergyProduct) => {
    if (product.name === 'Powerwall') {
      return (product.units * product.capacity) / 1000000; // Convert kWh to GWh
    } else {
      return (product.units * product.capacity) / 1000; // Convert MWh to GWh
    }
  };

  const totalGWh = products.reduce((sum, product) => sum + calculateGWh(product), 0);
  const totalRevenue = totalGWh * revenuePerGWh;
  const totalProfit = totalRevenue * (profitPercentage / 100);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label htmlFor="revenuePerGWh" className="block text-sm font-medium text-gray-700">
            Revenue per GWh ($)
          </label>
          <Input
            id="revenuePerGWh"
            type="number"
            value={revenuePerGWh}
            onChange={(e) => onRevenuePerGWhChange(parseFloat(e.target.value) || '')}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="profitPercentage" className="block text-sm font-medium text-gray-700">
            Profit Percentage (%)
          </label>
          <Input
            id="profitPercentage"
            type="number"
            value={profitPercentage}
            onChange={(e) => onProfitPercentageChange(parseFloat(e.target.value) || '')}
            className="mt-1"
          />
        </div>
      </div>
      <Table className="w-full mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Capacity (kWh/MWh)</TableHead>
            <TableHead>Total GWh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.name}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.units}
                  onChange={(e) => handleInputChange(index, 'units', e.target.value)}
                  className="w-full"
                />
              </TableCell>
              <TableCell>{product.capacity} {product.name === 'Powerwall' ? 'kWh' : 'MWh'}</TableCell>
              <TableCell>{calculateGWh(product).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <div>
          <p className="font-bold">Total Energy Capacity:</p>
          <p className="text-2xl font-bold">{totalGWh.toFixed(2)} GWh</p>
        </div>
        <div>
          <p className="font-bold">Total Revenue:</p>
          <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-bold">Total Profit:</p>
          <p className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}