'use client'

import { useEffect, useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableCard from '../../components/SortableCard'

export default function CollectionPage() {
  const [collection, setCollection] = useState([])
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('pokemon-collection') || '[]')
    setCollection(saved)
    setHasMounted(true)
  }, [])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = collection.findIndex(p => p.id === active.id)
      const newIndex = collection.findIndex(p => p.id === over.id)
      const newOrder = arrayMove(collection, oldIndex, newIndex)
      setCollection(newOrder)
      localStorage.setItem('pokemon-collection', JSON.stringify(newOrder))
    }
  }

  const handleRemove = (id) => {
    const updated = collection.filter(p => p.id !== id)
    setCollection(updated)
    localStorage.setItem('pokemon-collection', JSON.stringify(updated))
    window.dispatchEvent(new Event('collectionUpdated'))
  }

  if (!hasMounted) return null // 🛑 Prevent SSR mismatch

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">📦 My Pokémon Collection</h2>

      {collection.length === 0 ? (
        <p className="text-gray-500">Your collection is empty.</p>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={collection.map(p => p.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {collection.map((pokemon) => (
                <SortableCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onRemove={() => handleRemove(pokemon.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}

