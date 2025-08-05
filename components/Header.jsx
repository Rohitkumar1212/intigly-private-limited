'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const isDiscover = pathname === '/discover'
  const isCollection = pathname === '/collection'

  const [collectionCount, setCollectionCount] = useState(0)

  // Function to update count from localStorage
  const updateCount = () => {
    const stored = localStorage.getItem('pokemon-collection')
    setCollectionCount(stored ? JSON.parse(stored).length : 0)
  }

  useEffect(() => {
    updateCount()

    // Listen for custom event when collection changes
    const handleCollectionChange = () => updateCount()
    window.addEventListener('collectionUpdated', handleCollectionChange)

    return () => {
      window.removeEventListener('collectionUpdated', handleCollectionChange)
    }
  }, [])

  return (
    <header className="w-full flex flex-col items-center py-6 bg-gradient-to-b from-white to-purple-100 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1">🔥 Pokemon Collection App</h1>
      <p className="text-sm text-gray-600 mb-4">Discover, collect, and organize your favorite Pokémon!</p>
      
      <div className="flex gap-2 bg-white p-1 rounded-full shadow-inner border">
        <Link href="/discover">
          <button
            className={clsx(
              'px-4 py-1 text-sm rounded-full',
              isDiscover ? 'bg-purple-600 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Discover Pokémon
          </button>
        </Link>
        <Link href="/collection">
          <button
            className={clsx(
              'px-4 py-1 text-sm rounded-full flex items-center gap-1',
              isCollection ? 'bg-purple-600 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            My Collection
            <span className="text-xs bg-white text-purple-700 font-bold px-2 py-0.5 rounded-full shadow-sm">
              {collectionCount}
            </span>
          </button>
        </Link>
      </div>
    </header>
  )
}
