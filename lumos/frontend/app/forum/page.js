"use client"

import * as React from "react"
import { MessagesSquare, Search, Send, User, Users } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Custom background with gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />
      
      <div className="relative">
        {/* Header */}
        <header className="border-b border-cyan-500/20 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-wider text-cyan-500">CYBER_FORUM</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                  <Input 
                    placeholder="Search discussions..."
                    className="w-64 bg-black/50 pl-10 text-cyan-500 border-cyan-500/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>
                <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <Card className="lg:col-span-1 bg-black/50 border-cyan-500/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 text-cyan-500 mb-4">
                <Users className="h-5 w-5" />
                <h2 className="font-bold">Online Users</h2>
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8 border border-cyan-500/50">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>U{i + 1}</AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-black" />
                    </div>
                    <span className="text-sm text-cyan-100">CyberUser_{i + 1}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-3 bg-black/50 border-cyan-500/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 text-cyan-500 mb-4">
                <MessagesSquare className="h-5 w-5" />
                <h2 className="font-bold">Main Discussion</h2>
              </div>
              
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-4 group">
                      <Avatar className="h-10 w-10 border border-cyan-500/50">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>U{i + 1}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-cyan-400">CyberUser_{i + 1}</span>
                          <span className="text-xs text-cyan-500/50">2 minutes ago</span>
                        </div>
                        <Card className="bg-cyan-950/20 border-cyan-500/20 p-3 group-hover:border-cyan-500/40 transition-colors">
                          <p className="text-cyan-100">
                            This is a sample message in our cyberpunk forum. The future is now!
                          </p>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="mt-4 flex gap-4">
                <Input 
                  placeholder="Type your message..."
                  className="flex-1 bg-black/50 border-cyan-500/50 focus:border-cyan-400 focus:ring-cyan-400/20 text-cyan-100"
                />
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
