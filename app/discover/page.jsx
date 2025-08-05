// // app/discover/page.tsx

// 'use client'

// import { usePokemonList } from '@/hooks/usePokemonList'
// import PokemonCard from '@/components/PokemonCard'

// export default function DiscoverPage() {
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonList()

//   return (
//     <main className="p-6 max-w-5xl">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {data?.pages.flatMap((page) =>
//           page.results.map((pokemon) => (
//             <PokemonCard key={pokemon.id} {...pokemon} />
//           ))
//         )}
//       </div>

//       {hasNextPage && (
//         <div className="text-center mt-4">
//           <button
//             onClick={() => fetchNextPage()}
//             disabled={isFetchingNextPage}
//             className="text-blue-500"
//           >
//             {isFetchingNextPage ? 'Loading...' : 'Load more'}
//           </button>
//         </div>
//       )}
//     </main>
//   )
// }
'use client'

import { useEffect, useRef } from 'react'
import { usePokemonList } from '@/hooks/usePokemonList'
import PokemonCard from '@/components/PokemonCard'
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton'

export default function DiscoverPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonList()
  const loaderRef = useRef(null)

  //useEffect for tracking the user scroll and fetching data once certail threshold reach
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      {
        rootMargin: '200px',
      }
    )

    const node = loaderRef.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* cards list */}
        {data?.pages.flatMap((page) =>
          page.results.map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))
        )}
        
        {/* loader */}
        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <PokemonCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      <div ref={loaderRef} className="h-8" />
    </main>
  )
}
