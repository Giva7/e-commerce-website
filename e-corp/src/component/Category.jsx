

export function Category({
    products,
    setSelectedCategory
}) {

    const categories = [
        "All",
        ...new Set(products.map(product => product.category)),
    ]

    return (
        <div className="bg-gray-50 p-4 md:p-6 shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-3 md:mb-4 uppercase tracking-wide">Filter by Category</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {categories.map((category, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                className="px-3 md:px-5 py-2 md:py-2.5 bg-white text-gray-800 border-2 border-blue-500 rounded-lg font-medium text-xs md:text-sm hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out active:scale-95 touch-manipulation"
                            >
                                {category}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}