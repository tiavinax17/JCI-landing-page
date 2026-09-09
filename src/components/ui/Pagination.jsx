import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Génère les numéros de pages
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    }

    return [
      1,
      "...",
      currentPage,
      "...",
      totalPages
    ]
  }

  const pages = getPages()

  return (
    <div className="flex items-center gap-1">

      {/* Première page */}
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className="lg:w-8 lg:h-8 border h-6 w-6 border-gray-200 flex items-center justify-center disabled:opacity-30"
      >
        <ChevronsLeft size={16} />
      </button>

      {/* Page précédente */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="lg:w-8 lg:h-8 border h-6 w-6 border-gray-200 flex items-center justify-center disabled:opacity-30"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Numéros */}
      {pages.map((page, index) => {

        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="lg:w-8 lg:h-8 h-6 w-6 border flex items-center justify-center"
            >
              ...
            </span>
          )
        }

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`
              lg:w-8 lg:h-8 h-6 w-6
              border border-gray-200
              flex items-center justify-center
              text-sm
              ${
                currentPage === page
                  ? "bg-jci-yellow text-white border-jci-yellow"
                  : "bg-white text-jci-black"
              }
            `}
          >
            {page}
          </button>
        )
      })}

      {/* Page suivante */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="lg:w-8 lg:h-8 h-6 w-6 border border-gray-200 flex items-center justify-center disabled:opacity-30"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dernière page */}
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="lg:w-8 lg:h-8 border h-6 w-6 border-gray-200 flex items-center justify-center disabled:opacity-30"
      >
        <ChevronsRight size={16} />
      </button>

    </div>
  )
}

export default Pagination