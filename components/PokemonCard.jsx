
// export default function PokemonCard({ name, image, types, stats, onAdd }) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow-md text-center flex flex-col items-center">
//       <img src={image} alt={name} className="w-24 h-24 object-contain mb-2" />
//       <h2 className="text-lg font-bold capitalize">{name}</h2>
//       <div className="flex gap-2 mt-1">
//         {types.map((type) => (
//           <span key={type} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
//             {type.toUpperCase()}
//           </span>
//         ))}
//       </div>
//       <div className="text-xs mt-2">
//         <p>HP: {stats.hp}</p>
//         <p>Attack: {stats.attack}</p>
//         <p>Defense: {stats.defense}</p>
//       </div>
//       {onAdd && (
//         <button
//           onClick={onAdd}
//           className="mt-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs"
//         >
//           +
//         </button>
//       )}
//     </div>
//   )
// }
// components/PokemonCard.tsx

import { FaPlus } from 'react-icons/fa'

export default function PokemonCard({ id, name, image, types, stats }) {
  const handleAddToCollection = () => {
    const existing = JSON.parse(localStorage.getItem('pokemon-collection') || '[]')
    const alreadyExists = existing.find((p) => p.id === id)

    if (!alreadyExists) {
      const updated = [...existing, { id, name, image, types, stats }]
      localStorage.setItem('pokemon-collection', JSON.stringify(updated))
      window.dispatchEvent(new Event('collectionUpdated'))
    }
  }

  return (
    <div className="relative bg-white p-4 rounded-xl shadow-md text-center flex flex-col items-center">
      {/* Add Icon */}
      <button
        onClick={handleAddToCollection}
        className="absolute top-2 right-2 text-green-500 hover:text-green-600 bg-white rounded-full p-1 shadow cursor-pointer"
        title="Add to Collection"
      >
        <FaPlus />
      </button>

      <img src={image} alt={name} className="w-24 h-24 object-contain mb-2" />
      <h2 className="text-lg font-bold capitalize">{name}</h2>
      <div className="flex gap-2 mt-1 flex-wrap justify-center">
        {types.map((type) => (
          <span key={type} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
            {type.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="text-xs mt-2">
        <p>HP: {stats.hp}</p>
        <p>Attack: {stats.attack}</p>
        <p>Defense: {stats.defense}</p>
      </div>
    </div>
  )
}

