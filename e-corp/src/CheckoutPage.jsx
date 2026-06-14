import { useOutletContext } from "react-router-dom"

export function CheckoutPage() {
    const { cart, setCart } = useOutletContext()

    function removeFromCart(cartIdToRemove) {
        setCart(cart.filter((item) => item.cartId !== cartIdToRemove))
    }

    function updateQuantity(cartId, amount) {
        setCart(cart.map((item) => {
            if (item.cartId === cartId) {
                const newQuantity = item.quantity + amount
                
                if (item.stock && newQuantity > item.stock) {
                    alert(`Sorry, only ${item.stock} items are available in stock.`)
                    return item
                }

                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
            }
            return item
        }))
    }

    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <div className="p-4 md:p-6 max-w-6xl w-full mx-auto mt-4">
            <header className="border-b-2 border-gray-300 pb-4 md:pb-6 mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
                <p className="font-semibold text-gray-600 text-sm md:text-base">Total items: {totalItemsCount}</p>
            </header>

            <div>
                {cart.length === 0 ? (
                    <div className="text-center py-16 md:py-24">
                        <p className="text-lg md:text-xl text-gray-500">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div 
                                key={item.cartId} 
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center border border-gray-200 rounded-lg p-4 md:p-5 bg-white hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3 md:gap-4 sm:col-span-2">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-16 h-16 md:w-20 md:h-20 object-contain"
                                    />
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-gray-800 truncate text-sm md:text-base">{item.title}</h3>
                                        <p className="text-gray-600 text-xs md:text-sm">Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-start md:justify-center gap-2 sm:col-span-1">
                                    <button 
                                        onClick={() => updateQuantity(item.cartId, -1)}  
                                        className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer font-bold text-center flex items-center justify-center"
                                    >
                                        −
                                    </button>
                                    <span className="font-semibold text-gray-800 w-8 text-center text-sm md:text-base">
                                        {item.quantity}
                                    </span>
                                    <button 
                                        onClick={() => updateQuantity(item.cartId, 1)} 
                                        className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer font-bold text-center flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3 sm:col-span-1">
                                    <div>
                                        <p className="text-xs text-gray-600 md:hidden">Subtotal:</p>
                                        <p className="font-bold text-gray-800 text-sm md:text-base">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.cartId)}
                                        className="bg-red-500 text-white border-none py-2 px-3 md:px-4 rounded-lg cursor-pointer font-semibold hover:bg-red-600 transition text-xs md:text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 md:mt-12 border-t-2 border-gray-300 pt-6 md:pt-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</h2>
                                <button 
                                    onClick={() => alert("Proceeding to payment mock feature...")}
                                    className="w-full sm:w-auto bg-green-600 text-white border-none py-3 px-6 md:px-8 rounded-lg cursor-pointer font-bold hover:bg-green-700 active:scale-95 transition-all text-base md:text-lg"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
