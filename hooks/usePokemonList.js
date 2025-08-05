import { useInfiniteQuery } from '@tanstack/react-query'
const fetchPokemonBatch = async ({ pageParam = 0 }) => {
  const limit = 6
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`)
  const data = await res.json()

  const results = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailsRes = await fetch(pokemon.url)
      const details = await detailsRes.json()

      const { id, name, sprites, types, stats } = details
      return {
        id,
        name,
        image: sprites.other['official-artwork'].front_default,
        types: types.map((t) => t.type.name),
        stats: {
          hp: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
        },
      }
    })
  )

  return { results, nextOffset: pageParam + limit }
}
export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemonBatch,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  })
}