"use client"

import { useState, useEffect } from "react"
import { Globe, DiscIcon as Discord, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Banner from "@/components/banner"
import GlitchText from "@/components/intro"
import { useRouter } from "next/navigation"

export default function Page() {
  const router=useRouter()
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [timeframe, setTimeframe] = useState("24h")

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("/api/stocktable")
        if (!response.ok) throw new Error("Failed to fetch stock data.")
        const data = await response.json()
        setStocks(data ?? [])
      } catch (err) {
        setError(err.message || "An error occurred.")
        console.error("Error fetching stock data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStockData()
    const interval = setInterval(fetchStockData, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-white font-mono">
      <Banner imagePath="/banner.png" />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center px-4 pt-20 pb-16">
          <GlitchText className="text-5xl font-bold" text="Browse the Marketplace" />
          <div className="mt-6 tracking-wider text-gray-400">
            <span>FASTEST DATA</span>
            <span className="mx-4">•</span>
            <span>DEEPEST LIQUIDITY</span>
            <span className="mx-4">•</span>
            <span>FUN REWARDS</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className={`font-mono ${timeframe === "1h" ? "bg-[#222222]" : ""}`}
              onClick={() => setTimeframe("1h")}
            >
              1h
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`font-mono ${timeframe === "24h" ? "bg-[#222222]" : ""}`}
              onClick={() => setTimeframe("24h")}
            >
              24h
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`font-mono ${timeframe === "7d" ? "bg-[#222222]" : ""}`}
              onClick={() => setTimeframe("7d")}
            >
              7d
            </Button>
          </div>
          <Input
            placeholder="Filter by collection"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setStocks(
                value
                  ? stocks.filter((stock) => stock[0].toLowerCase().includes(value))
                  : stocks
              );
            }}
            className="w-96 bg-[#111111] border-[#333333] font-mono"
          />
        </div>

        {loading && <p className="text-center text-gray-400">Loading stock data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && stocks.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-[#333333]">
            <table className="w-full border-collapse bg-[#121212] text-sm">
              <thead className="bg-[#1f1f1f] uppercase">
                <tr>
                  <th className="px-6 py-4 text-left font-normal">#</th>
                  <th className="px-6 py-4 text-left font-normal">Symbol</th>
                  <th className="px-6 py-4 text-right font-normal">Price (₹)</th>
                  <th className="px-6 py-4 text-right font-normal">24h High</th>
                  <th className="px-6 py-4 text-right font-normal">24h Low</th>
                  <th className="px-6 py-4 text-right font-normal">Volume</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map(([symbol, price, high, low, volume], index) => (
                  <tr 
                    key={symbol} 
                    className="even:bg-[#181818] hover:bg-[#232323] transition-colors duration-200"
                    onClick={() => router.push(`/dashboard/${symbol}`)}
                    onMouseEnter={(e) => e.currentTarget.style.cursor = "pointer"}
                  >
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-[#d4d4d4]">{symbol}</td>
                    <td className="px-6 py-4 text-right text-[#a3e635]">{price}</td>
                    <td className="px-6 py-4 text-right text-[#60a5fa]">{high}</td>
                    <td className="px-6 py-4 text-right text-[#f87171]">{low}</td>
                    <td className="px-6 py-4 text-right text-[#c4b5fd]">{volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p className="text-center text-gray-400">No stock data available.</p>
        )}
      </div>
    </div>
  )
}