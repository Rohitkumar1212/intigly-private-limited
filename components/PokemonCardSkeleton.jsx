export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md animate-pulse flex flex-col items-center">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-3" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="flex gap-2 mt-1 flex-wrap justify-center">
        <div className="h-3 w-10 bg-gray-200 rounded-full" />
        <div className="h-3 w-10 bg-gray-200 rounded-full" />
      </div>
      <div className="mt-2 space-y-1 text-center w-full">
        <div className="h-3 w-3/4 bg-gray-200 rounded mx-auto" />
        <div className="h-3 w-3/4 bg-gray-200 rounded mx-auto" />
        <div className="h-3 w-3/4 bg-gray-200 rounded mx-auto" />
      </div>
    </div>
  )
}
