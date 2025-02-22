"use client"

import React from 'react'
import AttributeComponent from '@/components/attribute'
import DisplayCard from '@/components/carddisplay'
import ProsCons from '@/components/prosTable'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BeakerIcon as Bear, BellIcon as Bull, Skull } from "lucide-react"
import Description from '@/components/desc'
import AIPrediction from '@/components/prediction'

const Page = ({params}) => {
  const [isMarketClosed, setIsMarketClosed] = useState(false)

  return (
    <div className='min-h-screen w-full bg-black'>
        <h1>Stock Name: {params.stockname}</h1>
        <AttributeComponent />
        <Description></Description>
        <AIPrediction></AIPrediction>
        <DisplayCard imageUrl="/bear.jpg" name="THE BEAR" description="This is a bear stock"></DisplayCard>
        <ProsCons pros={["Increased efficiency", "Cost reduction", "Better scalability", "Improved user experience"]} cons={["Initial setup complexity", "Learning curve", "Maintenance overhead", "Potential compatibility issues"]}></ProsCons>
        
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Market Hours Overlay */}
          {isMarketClosed && (
            <div className="absolute inset-0 bg-red-500/30 backdrop-blur-sm z-10 flex items-center justify-center">
              <p className="text-2xl font-bold text-white animate-pulse tracking-wider">
                Voting Disabled During Market Hours
              </p>
            </div>
          )}

          {/* Main Container */}
          <div className=" p-8 space-y-8 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-wider">
                <span className="text-cyan-400 font-mono">PLACE</span> YOUR BET
              </h2>
              <p className="text-cyan-300/70 font-mono">Choose your position wisely</p>
            </div>

            {/* Betting Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* The Bull */}
              <Button
                variant="outline"
                className="h-32 border-green-500/50 bg-black hover:bg-green-950/30 hover:border-green-400 group transition-all duration-300"
                onClick={() => console.log("Bull selected")}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Bull className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-bold text-green-400 tracking-wider font-mono">THE BULL</span>
                </div>
              </Button>

              {/* The Bear */}
              <Button
                variant="outline"
                className="h-32 border-red-500/50 bg-black hover:bg-red-950/30 hover:border-red-400 group transition-all duration-300"
                onClick={() => console.log("Bear selected")}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Bear className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-bold text-red-400 tracking-wider font-mono">THE BEAR</span>
                </div>
              </Button>

              {/* The Gorilla */}
              <Button
                variant="outline"
                className="h-32 border-purple-500/50 bg-black hover:bg-purple-950/30 hover:border-purple-400 group transition-all duration-300"
                onClick={() => console.log("Gorilla selected")}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Skull className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-bold text-purple-400 tracking-wider font-mono">THE GORILLA</span>
                </div>
              </Button>
            </div>

            {/* Toggle Market Hours Button (for demo) */}
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                className="border-cyan-500/50 hover:border-cyan-400 text-cyan-400"
                onClick={() => setIsMarketClosed(!isMarketClosed)}
              >
                Toggle Market Hours
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Page
