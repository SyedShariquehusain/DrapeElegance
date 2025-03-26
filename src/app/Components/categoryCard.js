import Link from "next/link"

export default function CategoryCard({ title, image, url }) {
  return (
    <div className="group relative w-full overflow-hidden rounded-md transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[1/1.2] w-full overflow-hidden bg-gray-100">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/20"></div>
      </div>
      <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm p-4 text-center">
        <h3 className="text-lg font-serif font-medium">{title}</h3>
        <Link
          href={url}
          className="mt-2 inline-block text-sm text-gray-700 hover:text-black border-b border-gray-400 pb-0.5 transition-all"
        >
          Browse Collection
        </Link>
      </div>
    </div>
  )
}

