
export function Header({ searchQuery, setSearchQuery }) {

    function searchComponent(event) {
        setSearchQuery(event.target.value)
    }

    return (
        <div className="bg-[#6843be] p-4 md:p-6 shadow-md">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-white text-2xl md:text-3xl font-bold truncate">Shop Now</h2>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={searchComponent}
                        className="w-full md:w-80 px-4 py-2 md:py-3 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition text-sm md:text-base"
                    />
                </div>
            </div>
        </div>
    )
}