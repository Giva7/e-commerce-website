import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Header } from "./component/Header"
import { ProductItems } from "./component/ProductItems"

import { products } from "./product"

import { Category } from "./component/Category"





export function HomePage(){
 
  const [searchQuery, setSearchQuery]= useState("")
  const [selectedCategory, setSelectedCategory]= useState('All')
  const {cart, setCart} = useOutletContext()

    const filteredProducts= products.filter((product)=>{
      const matchesSearch = product.title.toLowerCase()
      .includes(searchQuery.toLowerCase())


      const matchesCategory =
        selectedCategory === "All" || 
        product.category === selectedCategory

        return matchesCategory && matchesSearch
    })

  

    return(<>
      <Header 
        cart={cart}
        setCart={setCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Category 
        products={products} 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductItems 
        cart={cart}
        setCart={setCart}
        products={products} 
        currentProduct={filteredProducts}
      />
    </>)
}