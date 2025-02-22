"use client";

import React, { useState } from "react";
import AttributeComponent from "@/components/attribute";
import DisplayCard from "@/components/carddisplay";
import ProsCons from "@/components/prosTable";
import { Button } from "@/components/ui/button";
import { BeakerIcon as Bear, BellIcon as Bull, Skull } from "lucide-react";
import Description from "@/components/desc";
import AIPrediction from "@/components/prediction";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { Input } from "@/components/ui/input";
import { parseEther } from "viem";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const adminAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "winner", "type": "address" },
      { "indexed": false, "internalType": "uint8", "name": "option", "type": "uint8" }
    ],
    "name": "BetWon",
    "type": "event"
  },
  { "inputs": [], "name": "BearBet", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "BullBet", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "GorillaBet", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "bettingOpen", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "closeBetting", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint8", "name": "_winner", "type": "uint8" }], "name": "declareWinner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

const Page = ({ params }) => {
  const [betAmount, setBetAmount] = useState("");
  const { address } = useAccount();
  const { data: bettingOpen } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "bettingOpen",
    watch: true,
  });
  const { writeContract } = useWriteContract();

  const placeBet = (betFunction) => {
    if (!betAmount || isNaN(betAmount) || parseFloat(betAmount) <= 0) {
      alert("Enter a valid bet amount.");
      return;
    }
    writeContract({
      address: contractAddress,
      abi,
      functionName: betFunction,
      value: parseEther(betAmount),
    });
    setBetAmount("");
  };

  const closeBetting = () => {
    writeContract({ address: contractAddress, abi, functionName: "closeBetting" });
  };

  const handleDeclareWinner = (winnerOption) => {
    writeContract({
      address: contractAddress,
      abi,
      functionName: "declareWinner",
      args: [winnerOption],
    });
  };

  return (
    <div className="min-h-screen w-full bg-black p-8">
      <h1 className="text-4xl text-cyan-400 font-bold text-center">Stock Name: {params.stockname}</h1>
      <AttributeComponent />
      <Description />
      <AIPrediction />

      <DisplayCard imageUrl="/bear.jpg" name="THE BEAR" description="This is a bear stock" />
      <ProsCons
        pros={["Increased efficiency", "Cost reduction", "Better scalability", "Improved user experience"]}
        cons={["Initial setup complexity", "Learning curve", "Maintenance overhead", "Potential compatibility issues"]}
      />

      <div className="relative w-full max-w-3xl mx-auto mt-12">
        {!bettingOpen && (
          <div className="absolute inset-0 bg-red-500/30 backdrop-blur-sm z-10 flex items-center justify-center">
            <p className="text-2xl font-bold text-white animate-pulse">Voting Disabled During Market Hours</p>
          </div>
        )}

        <div className="p-8 space-y-8 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-gray-900 rounded-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">PLACE YOUR BET</h2>
            <p className="text-cyan-300 font-mono">Choose your position wisely</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BetButton betFunction="BullBet" icon={<Bull className="w-8 h-8 text-green-400" />} label="THE BULL" color="green" placeBet={placeBet} />
            <BetButton betFunction="BearBet" icon={<Bear className="w-8 h-8 text-red-400" />} label="THE BEAR" color="red" placeBet={placeBet} />
            <BetButton betFunction="GorillaBet" icon={<Skull className="w-8 h-8 text-purple-400" />} label="THE GORILLA" color="purple" placeBet={placeBet} />
          </div>

          <div className="flex justify-center">
            <Input
              placeholder="Enter your bet amount"
              className="text-white"
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            />
          </div>

          {address === adminAddress && (
            <div className="flex justify-center gap-4">
              <Button onClick={closeBetting} className="border-cyan-500 hover:bg-cyan-500 text-cyan-400">
                Disable Voting (Admin)
              </Button>
              <Button onClick={() => handleDeclareWinner(1)} className="border-green-500 hover:bg-green-500 text-green-400">
                Bull Winner
              </Button>
              <Button onClick={() => handleDeclareWinner(2)} className="border-red-500 hover:bg-red-500 text-red-400">
                Bear Winner
              </Button>
              <Button onClick={() => handleDeclareWinner(3)} className="border-purple-500 hover:bg-purple-500 text-purple-400">
                Gorilla Winner
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BetButton = ({ betFunction, icon, label, color, placeBet }) => (
  <Button
    variant="outline"
    className={`h-32 border-${color}-500 bg-black hover:bg-${color}-950/30 hover:border-${color}-400 group`}
    onClick={() => placeBet(betFunction)}
  >
    <div className="flex flex-col items-center space-y-2">
      {icon}
      <span className={`text-xl font-bold text-${color}-400`}>{label}</span>
    </div>
  </Button>
);

export default Page;
