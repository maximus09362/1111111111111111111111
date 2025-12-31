"use client"

import { useState, useEffect } from "react"
import { Plus, Check } from "lucide-react"

interface AddToCartAnimationProps {
  isAdding: boolean
  onAnimationComplete?: () => void
}

export function AddToCartAnimation({ isAdding, onAnimationComplete }: AddToCartAnimationProps) {
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    if (isAdding) {
      const timer = setTimeout(() => {
        setShowCheck(true)
        onAnimationComplete?.()

        const resetTimer = setTimeout(() => {
          setShowCheck(false)
        }, 1000)

        return () => clearTimeout(resetTimer)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isAdding, onAnimationComplete])

  return (
    <div className="relative inline-flex items-center justify-center">
      <div className={`transition-all duration-300 ${isAdding ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}>
        <Plus className="h-4 w-4" />
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          showCheck ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <Check className="h-4 w-4 text-green-600" />
      </div>

      {isAdding && <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping"></div>}
    </div>
  )
}
