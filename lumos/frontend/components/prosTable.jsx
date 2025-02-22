"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Minus } from "lucide-react"

export default function ProsCons({ pros,cons}) {
  return (
    <Card className="w-full max-w-4xl bg-black p-6 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="grid grid-cols-2 gap-4 p-0">
        <div className="p-4 text-center border-b border-r border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 tracking-wider animate-pulse">PROS</h2>
        </div>
        <div className="p-4 text-center border-b border-cyan-500/20">
          <h2 className="text-2xl font-bold text-rose-400 tracking-wider animate-pulse">CONS</h2>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 p-6">
        <div className="space-y-4">
          {pros.map((pro, index) => (
            <div key={index} className="flex items-center gap-3 text-cyan-300 hover:text-cyan-400 transition-colors">
              <Plus className="h-5 w-5 flex-shrink-0" />
              <span className="font-mono tracking-wide">{pro}</span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {cons.map((con, index) => (
            <div key={index} className="flex items-center gap-3 text-rose-300 hover:text-rose-400 transition-colors">
              <Minus className="h-5 w-5 flex-shrink-0" />
              <span className="font-mono tracking-wide">{con}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
