import Link from "next/link"

export default function CategoryCard({ title, image, url }) {
  return (
    <div className="group relative w-full overflow-hidden rounded-md transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[1/1.2] w-full overflow-hidden bg-gray-100">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity group-hover:opacity-90"></div>
      </div>
      <div className="absolute bottom-0 w-full p-6 text-center">
        <h3 className="text-xl font-serif font-medium text-white mb-2">{title}</h3>
        <Link
          href={url}
          className="inline-block bg-white/90 backdrop-blur-sm px-6 py-2 text-sm text-gray-900 hover:bg-white transition-all rounded-md opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-300"
        >
          Browse Collection
        </Link>
      </div>
    </div>
  )
}

