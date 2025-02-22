import { Card } from "@/components/ui/card"

export default function Description() {
  return (
    <div className="min-h-[300px] w-full bg-black p-6 grid place-items-center">
      <Card className="w-full max-w-md border border-cyan-500/20 bg-zinc-900/90 p-6 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl" />

        {/* Content */}
        <div className="relative space-y-4">
          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            <span className="inline-block animate-pulse">CYBER</span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              PUNK_2077
            </span>
          </h1>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-cyan-400 font-mono text-sm tracking-wider">STATUS: ONLINE</p>
            <p className="text-gray-300 font-light leading-relaxed border-l-2 border-cyan-500/50 pl-4">
              Decentralized entity roaming the digital plains. Collector of rare artifacts and digital memories.
              Building the future, one block at a time.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="border border-cyan-500/20 rounded-lg p-3 bg-black/50">
              <p className="text-xs text-cyan-400 font-mono">COLLECTION VALUE</p>
              <p className="text-2xl font-bold text-white">53.77 ETH</p>
            </div>
            <div className="border border-purple-500/20 rounded-lg p-3 bg-black/50">
              <p className="text-xs text-purple-400 font-mono">ITEMS OWNED</p>
              <p className="text-2xl font-bold text-white">324</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

