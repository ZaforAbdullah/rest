// src/components/LoadingSpinner.jsx
import React from 'react'

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex justify-center items-center py-20 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-blue-500 mr-4" />
      <p className="text-lg font-medium text-foreground">{text}</p>
    </div>
  )
}
