"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  return (
    <nav className="w-full border-b border-cyan-500/20 bg-black/95 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-6">
          <Button variant="ghost" className="text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 " onClick={() => router.push("/index")}>
            INDEX
          </Button>
          <Button variant="ghost" className="text-pink-400 hover:bg-pink-500/10 hover:text-pink-300 " onClick={() => router.push("/dashboard") }>
            STOCK
          </Button>
        </div>

        {/* Center section - Points Display */}
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-2">
            <span className="font-mono text-sm text-cyan-400">POINTS:</span>
            <span className="ml-2 font-mono text-lg font-bold text-cyan-300">0</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          <div className="glow-shadow-cyan">
            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                const ready = mounted
                if (!ready) return null

                return (
                  <Button
                    onClick={!account ? openConnectModal : openAccountModal}
                    variant="outline"
                    className="border-cyan-500/50 bg-black text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {!account ? "Connect Wallet" : account.displayName}
                  </Button>
                )
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </nav>
  )
}

