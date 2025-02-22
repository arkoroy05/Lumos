"use client"

import { useEffect, useState } from "react"
import "../app/globals.css"
import axios from "axios"

const getStockMarketStatus = () => {
  const now = new Date()
  const openingTime = new Date()
  openingTime.setHours(9, 15, 0, 0)

  const closingTime = new Date()
  closingTime.setHours(15, 30, 0, 0)

  if (now >= closingTime) {
    openingTime.setDate(openingTime.getDate() + 1)
    const diff = openingTime.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return { status: "CLOSED", message: `MARKET OPENS IN ${hours}H ${minutes}M` }
  } else if (now < openingTime) {
    const diff = openingTime.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return { status: "CLOSED", message: `MARKET OPENS IN ${hours}H ${minutes}M` }
  } else {
    const diff = closingTime.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return { status: "OPEN", message: `MARKET OPEN FOR ${hours}H ${minutes}M` }
  }
}

export default function Banner({ imagePath }) {
  const [status, setStatus] = useState(getStockMarketStatus())
  const [nifty, setNifty] = useState({ price: null, dayhigh: null, daylow: null, timezone: null })

  useEffect(() => {
    const fetchNiftyData = async () => {
      try {
        const response = await axios.get("/api/bannerdata")
        const results = response.data.chart.result[0]
        setNifty({
          price: results.meta.regularMarketPrice,
          dayhigh: results.meta.regularMarketDayHigh,
          daylow: results.meta.regularMarketDayLow,
          timezone: results.meta.exchangeTimezoneName,
        })
      } catch (error) {
        console.error("Error fetching Nifty 50 data:", error)
      }
    }

    fetchNiftyData()
    const dataInterval = setInterval(fetchNiftyData, 60000)
    return () => clearInterval(dataInterval)
  }, [])

  useEffect(() => {
    setStatus(getStockMarketStatus())
    const timeInterval = setInterval(() => {
      setStatus(getStockMarketStatus())
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [])

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Dynamic Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${imagePath})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-white p-12 border border-zinc-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-[300px]">
          {/* Left Side */}
          <div className="space-y-8 text-center md:text-left flex-1">
            <h1 className="text-4xl font-mono tracking-wider bg-gradient-to-r from-red-700 to-purple-600 bg-clip-text text-transparent">
              product name
            </h1>
            <div className="text-zinc-400 text-5xl md:text-7xl font-mono font-extrabold pt-4">
              {status.message}
            </div>
          </div>

          {/* Right Side */}
          <div className="text-right space-y-6 flex-1">
            <div className="flex flex-col items-end gap-4">
              <div className="text-emerald-400 text-2xl font-mono">
                {nifty.price != null ? nifty.price.toLocaleString() : "..."} MARKET PRICE
              </div>
            </div>

            <div className="text-base text-zinc-400 space-y-2">
              <div>24H HIGH: {nifty.dayhigh || "..."}</div>
              <div>24H LOW: {nifty.daylow || "..."}</div>
              <div>TIMEZONE: {nifty.timezone || "..."}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}