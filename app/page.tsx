"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CarModels, CarModel } from '@/components/CarModels';
import { Energy, EnergyProduct } from '@/components/Energy';
import { FSD } from '@/components/FSD';
import { Humanoids } from '@/components/Humanoids';
import { Valuation } from '@/components/Valuation';

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
  { name: 'Powerwall', units: 300000, capacity: 13.5 }, // 13.5 kWh
  { name: 'Megapack', units: 2750, capacity: 3.9 }, // 3.9 MWh
];

export default function Home() {
  const [carModels, setCarModels] = useState<CarModel[]>(initialCarModels);
  const [energyProducts, setEnergyProducts] = useState<EnergyProduct[]>(initialEnergyProducts);
  const [energyProfitPercentage, setEnergyProfitPercentage] = useState(19);
  const [revenuePerGWh, setRevenuePerGWh] = useState(407000000); // $407 million per GWh

  const [includeFSD, setIncludeFSD] = useState(true);
  const [includeOptimus, setIncludeOptimus] = useState(true);

  // FSD state
  const [fleetSize, setFleetSize] = useState(5000000);
  const [potentialRevenuePerVehicle, setPotentialRevenuePerVehicle] = useState(6000);
  const [usageFactor, setUsageFactor] = useState(100);
  const [fsdProfitFactor, setFsdProfitFactor] = useState(50);

  // Humanoids (Optimus) state
  const [humanoidUnits, setHumanoidUnits] = useState(0);
  const [humanoidAvgCost, setHumanoidAvgCost] = useState(10000);
  const [humanoidAvgSellingPrice, setHumanoidAvgSellingPrice] = useState(20000);

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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 pb-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Tesla Valuation Dashboard</h1>
        
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Models</CardTitle>
            </CardHeader>
            <CardContent>
              <CarModels models={carModels} onModelChange={setCarModels} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy Products</CardTitle>
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

      {/* Sticky Footer for Total Valuation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="fsd-toggle"
                  checked={includeFSD}
                  onCheckedChange={setIncludeFSD}
                />
                <Label htmlFor="fsd-toggle" className="text-sm font-medium">FSD</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="optimus-toggle"
                  checked={includeOptimus}
                  onCheckedChange={setIncludeOptimus}
                />
                <Label htmlFor="optimus-toggle" className="text-sm font-medium">Optimus</Label>
              </div>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Profit</p>
                <p className="text-xl font-bold text-green-600">${totalProfit.toLocaleString()}</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Valuation</p>
                <Valuation totalProfit={totalProfit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}