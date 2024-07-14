"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { CarModels, CarModel } from '@/components/CarModels';
import { Energy, EnergyProduct } from '@/components/Energy';
import { FSD } from '@/components/FSD';
import { Humanoids } from '@/components/Humanoids';

const initialCarModels: CarModel[] = [
  { name: 'Model 3', units: 764025, avgPrice: 41000, avgCost: 37807 },
  { name: 'Model Y', units: 1004389, avgPrice: 46000, avgCost: 41818 },
  { name: 'Model S', units: 35000, avgPrice: 85000, avgCost: 70000 },
  { name: 'Model X', units: 35000, avgPrice: 95000, avgCost: 80000 },
  { name: 'Cybertruck', units: 0, avgPrice: 50000, avgCost: 45000 },
  { name: 'Semi', units: 0, avgPrice: 150000, avgCost: 130000 },
  { name: 'Robotaxi', units: 0, avgPrice: 100000, avgCost: 80000 },
];

const initialEnergyProducts: EnergyProduct[] = [
  { name: 'Powerwall', units: 300000, capacity: 13.5 },
  { name: 'Megapack', units: 2750, capacity: 3.9 },
];

export default function Home() {
  const [carModels, setCarModels] = useState<CarModel[]>(initialCarModels);
  const [energyProducts, setEnergyProducts] = useState<EnergyProduct[]>(initialEnergyProducts);
  const [energyProfitPercentage, setEnergyProfitPercentage] = useState(19);
  const [revenuePerGWh, setRevenuePerGWh] = useState(407000000);

  const [includeFSD, setIncludeFSD] = useState(true);
  const [includeOptimus, setIncludeOptimus] = useState(true);

  const [fleetSize, setFleetSize] = useState(5000000);
  const [potentialRevenuePerVehicle, setPotentialRevenuePerVehicle] = useState(6000);
  const [usageFactor, setUsageFactor] = useState(100);
  const [fsdProfitFactor, setFsdProfitFactor] = useState(50);

  const [humanoidUnits, setHumanoidUnits] = useState(0);
  const [humanoidAvgCost, setHumanoidAvgCost] = useState(10000);
  const [humanoidAvgSellingPrice, setHumanoidAvgSellingPrice] = useState(20000);

  const [peRatio, setPeRatio] = useState(30);
  const [userStockCount, setUserStockCount] = useState(0);

  const carTotalProfit = carModels.reduce((sum, model) => 
    sum + (model.units * (model.avgPrice - model.avgCost)), 0);

  const energyTotalGWh = energyProducts.reduce((sum, product) => {
    const gwh = product.name === 'Powerwall' 
      ? (product.units * product.capacity) / 1000000 
      : (product.units * product.capacity) / 1000;
    return sum + gwh;
  }, 0);

  const energyTotalRevenue = energyTotalGWh * revenuePerGWh;
  const energyTotalProfit = energyTotalRevenue * (energyProfitPercentage / 100);

  const fsdTotalRevenue = fleetSize * potentialRevenuePerVehicle * (usageFactor / 100);
  const fsdTotalProfit = fsdTotalRevenue * (fsdProfitFactor / 100);

  const humanoidsTotalRevenue = humanoidUnits * humanoidAvgSellingPrice;
  const humanoidsTotalProfit = humanoidUnits * (humanoidAvgSellingPrice - humanoidAvgCost);

  const totalProfit = carTotalProfit + energyTotalProfit + 
    (includeFSD ? fsdTotalProfit : 0) +
    (includeOptimus ? humanoidsTotalProfit : 0);

  const totalValuation = totalProfit * peRatio;
  const outstandingShares = 3.19e9;
  const calculatedStockPrice = totalValuation / outstandingShares;
  const userStockValue = calculatedStockPrice * userStockCount;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 pb-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Tesla Valuation Dashboard</h1>
        
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Vehicle Models</h2>
            </CardHeader>
            <CardContent>
              <CarModels models={carModels} onModelChange={setCarModels} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Energy Products</h2>
            </CardHeader>
            <CardContent>
              <Energy 
                products={energyProducts} 
                onProductChange={setEnergyProducts}
                profitPercentage={energyProfitPercentage}
                onProfitPercentageChange={setEnergyProfitPercentage}
                revenuePerGWh={revenuePerGWh}
                onRevenuePerGWhChange={setRevenuePerGWh}
              />
            </CardContent>
          </Card>

          <div className={`transition-opacity duration-300 ${includeFSD ? 'opacity-100' : 'opacity-50'}`}>
            <FSD
              fleetSize={fleetSize}
              onFleetSizeChange={setFleetSize}
              potentialRevenuePerVehicle={potentialRevenuePerVehicle}
              onPotentialRevenuePerVehicleChange={setPotentialRevenuePerVehicle}
              usageFactor={usageFactor}
              onUsageFactorChange={setUsageFactor}
              profitFactor={fsdProfitFactor}
              onProfitFactorChange={setFsdProfitFactor}
            />
          </div>

          <div className={`transition-opacity duration-300 ${includeOptimus ? 'opacity-100' : 'opacity-50'}`}>
            <Humanoids
              units={humanoidUnits}
              onUnitsChange={setHumanoidUnits}
              avgCost={humanoidAvgCost}
              onAvgCostChange={setHumanoidAvgCost}
              avgSellingPrice={humanoidAvgSellingPrice}
              onAvgSellingPriceChange={setHumanoidAvgSellingPrice}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 shadow-lg py-3">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="fsd-toggle"
                  checked={includeFSD}
                  onCheckedChange={setIncludeFSD}
                  aria-label={`Include FSD in calculations: ${includeFSD ? 'on' : 'off'}`}
                />
                <Label htmlFor="fsd-toggle" className="text-sm font-medium">FSD</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="optimus-toggle"
                  checked={includeOptimus}
                  onCheckedChange={setIncludeOptimus}
                  aria-label={`Include Optimus in calculations: ${includeOptimus ? 'on' : 'off'}`}
                />
                <Label htmlFor="optimus-toggle" className="text-sm font-medium">Optimus</Label>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <Label htmlFor="stockCount" className="text-sm font-medium">Your Stocks:</Label>
              <Input
                id="stockCount"
                type="number"
                value={userStockCount}
                onChange={(e) => setUserStockCount(Number(e.target.value) || 0)}
                className="w-24 h-8 text-sm"
                aria-label="Enter your stock count"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 col-span-1 lg:col-span-2">
              <div className="text-center">
                <p className="text-xs font-medium mb-1">Stock Price</p>
                <p className="text-sm font-bold text-green-800">
                  ${calculatedStockPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium mb-1">Company Valuation</p>
                <p className="text-sm font-bold text-blue-800">
                  ${(totalValuation / 1e9).toFixed(2)}B
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium mb-1">Total Profit</p>
                <p className="text-sm font-bold text-yellow-800">
                  ${(totalProfit / 1e9).toFixed(2)}B
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium mb-1">Your Stock Value</p>
                <p className="text-sm font-bold text-purple-800">
                  ${userStockValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}