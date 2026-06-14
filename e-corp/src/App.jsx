import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import { HomePage } from "./HomePage"
import { CheckoutPage } from "./CheckoutPage";
import { useState, useEffect } from "react";

function RootLayout(){
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopping_cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart))
  }, [cart])

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="font-roboto">
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between gap-2 md:gap-4 p-3 md:p-5 bg-[#6843be] text-white font-bold shadow-md">
        <Link to="/" className="flex items-center gap-2 rounded-xl bg-white/10 px-2 md:px-3 py-2 hover:bg-white/20 transition">
          <img
            src="/images/e-corp.png"
            alt="E-CORP logo"
            className="h-12 md:h-16 w-auto"
          />
        </Link>
        <Link to="/checkout" className="rounded-xl bg-white/10 px-3 md:px-4 py-2 hover:bg-white/20 transition text-sm md:text-base">
          Cart({totalItemsCount})
        </Link>
      </nav>

      <Outlet context={{cart, setCart}} />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/checkout",
        element: <CheckoutPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

