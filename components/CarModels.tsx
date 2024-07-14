"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CarModel {
  name: string;
  units: number;
  avgPrice: number;
  avgCost: number;
}

interface CarModelsProps {
  models: CarModel[];
  onModelChange: (updatedModels: CarModel[]) => void;
}

export function CarModels({ models, onModelChange }: CarModelsProps) {
  const handleInputChange = (index: number, field: keyof CarModel, value: string) => {
    const updatedModels = models.map((model, i) => 
      i === index ? { ...model, [field]: parseFloat(value) || '' } : model
    );
    onModelChange(updatedModels);
  };

  const calculateRevenue = (model: CarModel) => model.units * model.avgPrice;
  const calculateProfit = (model: CarModel) => model.units * (model.avgPrice - model.avgCost);
  const calculateProfitPercentage = (model: CarModel) => 
    model.avgPrice === 0 ? 0 : ((model.avgPrice - model.avgCost) / model.avgPrice) * 100;

  const totalRevenue = models.reduce((sum, model) => sum + calculateRevenue(model), 0);
  const totalProfit = models.reduce((sum, model) => sum + calculateProfit(model), 0);

  return (
    <div className="overflow-x-auto">
      <Table className="w-full mb-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Model</TableHead>
            <TableHead className="w-1/6">Units</TableHead>
            <TableHead className="w-1/6">Avg Price ($)</TableHead>
            <TableHead className="w-1/6">Avg Cost ($)</TableHead>
            <TableHead className="w-1/6">Profit %</TableHead>
            <TableHead className="w-1/6">Revenue ($)</TableHead>
            <TableHead className="w-1/6">Profit ($)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {models.map((model, index) => (
          <TableRow key={model.name}>
            <TableCell>{model.name}</TableCell>
            <TableCell>
              <Label htmlFor={`units-${index}`} className="sr-only">Units for {model.name}</Label>
              <Input
                id={`units-${index}`}
                type="number"
                value={model.units}
                onChange={(e) => handleInputChange(index, 'units', e.target.value)}
              />
            </TableCell>
            <TableCell>
              <Label htmlFor={`avgPrice-${index}`} className="sr-only">Average Price for {model.name}</Label>
              <Input
                id={`avgPrice-${index}`}
                type="number"
                value={model.avgPrice}
                onChange={(e) => handleInputChange(index, 'avgPrice', e.target.value)}
              />
            </TableCell>
            <TableCell>
              <Label htmlFor={`avgCost-${index}`} className="sr-only">Average Cost for {model.name}</Label>
              <Input
                id={`avgCost-${index}`}
                type="number"
                value={model.avgCost}
                onChange={(e) => handleInputChange(index, 'avgCost', e.target.value)}
              />
            </TableCell>
            <TableCell>{calculateProfitPercentage(model).toFixed(2)}%</TableCell>
            <TableCell>${calculateRevenue(model).toLocaleString()}</TableCell>
            <TableCell>${calculateProfit(model).toLocaleString()}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
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