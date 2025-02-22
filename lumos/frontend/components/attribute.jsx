import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AttributeComponent = () => {
  const attributes = [
    { name: "Momentum", value: 50, color: "bg-red-500", message: "The more momentum, the more bullish" },
    { name: "Volatility", value: 14, color: "bg-green-500", message: "The more volatile, the more the price fluctuates." },
    { name: "Bearish Loyalty", value: 12, color: "bg-yellow-500", message: "The more the loyalty, the more the bearish sentiment" },
    { name: "Resistance", value: 16, color: "bg-blue-500", message: "The more the resistance, the more the price stability" },
    { name: "Surprise Factor", value: 15, color: "bg-pink-500", message: "The more the surprise, the more the price fluctuates." },
  ];

  return (
    <TooltipProvider>
      <div className="w-full max-w-md p-4 bg-[#0D1117] rounded-lg border border-gray-800">
        <h2 className="text-xl font-mono text-gray-100 mb-4">Stock Traits</h2>
        <div className="space-y-3">
          {attributes.map((attribute) => (
            <div key={attribute.name} className="flex items-center space-x-3">
              <div className="w-20 font-mono text-xs text-gray-300">{attribute.name}</div>
              <div className="w-12 text-center font-mono text-xs text-gray-100">
                {attribute.value}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 h-2 bg-gray-800rounded-full overflow-hidden cursor-pointer">
                    <div
                      className={`h-full ${attribute.color} text-white opacity-80`}
                      style={{ width: `${(attribute.value / 100) * 100}%` }}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-white">
                  <p>{attribute.message}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AttributeComponent;
