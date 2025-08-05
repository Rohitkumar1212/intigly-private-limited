
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FaTimes } from 'react-icons/fa'
import { LuGripVertical } from 'react-icons/lu' // drag handle icon (optional)

export default function SortableCard({ pokemon, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: pokemon.id, activationConstraint: {
    delay: 250,
    tolerance: 5,
  }, })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} // just attributes, not listeners here
      className="relative bg-white p-4 rounded-xl shadow-md text-center flex flex-col items-center"
    >
      {/* 🗑️ Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onRemove()
          console.log('clicked')
        }}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600 z-10 bg-white rounded-full p-1 shadow cursor-pointer"
        title="Remove"
      >
        <FaTimes />
      </button>

      {/* 🟰 Drag Handle */}
      <div
        {...listeners}
        className="absolute bottom-2 right-2 text-gray-400 cursor-grab active:cursor-grabbing"
        title="Drag"
      >
        <LuGripVertical size={20} />
      </div>

      {/* 📛 Pokémon Info */}
      <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 object-contain mb-2" />
      <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
      <div className="flex gap-2 mt-1 flex-wrap justify-center">
        {pokemon.types.map((type) => (
          <span key={type} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
            {type.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="text-xs mt-2">
        <p>HP: {pokemon.stats.hp}</p>
        <p>Attack: {pokemon.stats.attack}</p>
        <p>Defense: {pokemon.stats.defense}</p>
      </div>
    </div>
  )
}

