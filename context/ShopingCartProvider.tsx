"use client"

import { 
    createContext, 
    useContext, 
    useState, 
} from "react"
import { 
    ShopingCartContextProps, 
    CartItemProps, 
    ProductProps,
} from "@/types/index"

const ShopingCartContext = createContext({} as ShopingCartContextProps)

export const useShopingCart = () => {
  return useContext(ShopingCartContext)
}

export const ShopingCartProvider = ({ children, }: { children: React.ReactNode }) => {

    const [ cartItems, setCartItems ] = useState<CartItemProps[]>([])
    
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 
        0
        )
        
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number) => {
        setCartItems(cartItems => {
            if (cartItems.find(item => item.id === id) == null) {
                return [...cartItems, { id, quantity: 1 }]
            } else {
                return cartItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseQuantity = (id: number) => {
        setCartItems(cartItems => {
            if (cartItems.find(item => item.id === id)?.quantity === 1) {
                return cartItems.filter(item => item.id !== id)
            } else {
                return cartItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })

    }

    const removeFromCart = (id: number) => {
        setCartItems(cartItems => {
            return cartItems.filter(item => item.id !== id)
        })
    }

    const calculateTotalPrice = (products: ProductProps[]) => {
        return cartItems.reduce((total, item) => {
          const product = products.find((p) => p.id === item.id);
          if (product) {
            total += product.price * item.quantity;
          }
          return total;
        }, 0);
      };

    return (
        <ShopingCartContext.Provider 
            value={{ 
                getItemQuantity, 
                increaseCartQuantity, 
                decreaseQuantity, 
                removeFromCart,
                cartQuantity,
                cartItems,
                calculateTotalPrice,
            }}
        >
            {children}
        </ShopingCartContext.Provider>
    )
}
