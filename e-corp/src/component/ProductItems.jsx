import { useEffect, useRef, useState } from "react"

export function ProductItems({ currentProduct, cart, setCart }) {
    const [quantities, setQuantities] = useState({})
    const [addedStatus, setAddedStatus] = useState({})
    const timeoutRefs = useRef({})

    function handleQuantityChange(productId, value) {
        setQuantities({
            ...quantities,
            [productId]: Number(value)
        })
    }

    function addToCart(idToAdd) {
        const productToAdd = currentProduct.find((product) => product.id === idToAdd)
        const chosenQuantity = quantities[idToAdd] || 1
        const existingProduct = cart.find((item) => item.id === idToAdd)
        const currentCartQuantity = existingProduct ? existingProduct.quantity : 0
        const newTotalQuantity = currentCartQuantity + chosenQuantity

        if (productToAdd.stock && newTotalQuantity > productToAdd.stock) {
            alert(`Cannot add more. You already have ${currentCartQuantity} in your cart, and max stock is ${productToAdd.stock}.`)
            return
        }

        if (existingProduct) {
            setCart(cart.map((item) => 
                item.id === idToAdd 
                    ? { ...item, quantity: item.quantity + chosenQuantity }
                    : item
            ))
        } else {
            setCart([
                ...cart,
                {
                    ...productToAdd,
                    cartId: crypto.randomUUID(),
                    quantity: chosenQuantity
                }
            ])
        }

        setAddedStatus((prev) => ({ ...prev, [idToAdd]: true }))

        if (timeoutRefs.current[idToAdd]) {
            clearTimeout(timeoutRefs.current[idToAdd])
        }

        timeoutRefs.current[idToAdd] = setTimeout(() => {
            setAddedStatus((prev) => ({ ...prev, [idToAdd]: false }))
            timeoutRefs.current[idToAdd] = null
        }, 900)
    }

    useEffect(() => {
        return () => {
            Object.values(timeoutRefs.current).forEach((timeoutId) => {
                if (timeoutId) clearTimeout(timeoutId)
            })
        }
    }, [])

    useEffect(() => {
        console.log("Current Cart State:", cart)
    }, [cart])

    return (
        <div
         className="flex flex-wrap gap-5  p-5"
         >
            {currentProduct.map((product) => {
                const currentQuantity = quantities[product.id] || 1
                const maxSelectable = product.stock || 10 

                return (
                    <div 
                        key={product.id} 

                       
                        className="border rounded-lg border-[#ccc] p-4 w-55 flex flex-col justify-between"
                    >
                        <div>
                            <h3
                            className="text-[1.1rem] mb-2.5"
                            
                            >{product.title}</h3>
                            <img 
                                src={product.image} 
                                alt={product.title} 
                               
                                className="w-full h-37.5 object-contain mb-2.5"
                            />
                            <div
                            className="text-[1.2rem] bold mb-3"
                            >
                                ${product.price.toFixed(2)}
                            </div>
                        </div>

                        <div>
                            <div className="mb-2.5 flex justify-between items-center">
                                <label htmlFor={`select-${product.id}`} className="text-sm font-medium text-gray-700">Qty:</label>
                                <select 
                                    id={`select-${product.id}`}
                                    value={currentQuantity} 
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    className="p-3 rounded-lg border border-gray-300 bg-white text-sm"
                                >
                                    {Array.from({ length: maxSelectable }, (_, i) => i + 1).map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                {addedStatus[product.id] && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-2 text-sm text-white shadow-lg">
                                        Added
                                    </div>
                                )}
                                <button 
                                    onClick={() => addToCart(product.id)}
                                    className="w-full bg-[#007bff] text-white border-0 p-4 rounded-xl cursor-pointer font-bold hover:bg-blue-600 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
