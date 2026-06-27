import React from 'react'

const PdpScaleton = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 mt-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-gray-200" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-5 w-1/3 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div> 
      </div>
  )
}

export default PdpScaleton
