import { createContext, useContext, useEffect, useReducer } from "react"
import { cartReducer } from "../reducer/cartReducer";

const initialState = {
    cartList: [],
    total: 0,
}

const CartContex = createContext(JSON.parse(localStorage.getItem("cartList")) || initialState);




 export const CartProvider = ( {children} ) =>{

    useEffect(()=>{
        localStorage.setItem('cartList', JSON.stringify(state))
    },[initialState])

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) =>{
        const updateCartList = state.cartList.concat(product);
        updateTotal(updateCartList);
        dispatch({
            type: "ADD_TO_CART",
            payload:{
                products: updateCartList
            }
        })
    }
    const removeFromCart = (product) =>{
        const updateCartList = state.cartList.filter(current => current.id !== product.id);
        updateTotal(updateCartList);
        dispatch({
            type: "REMOVE_FROM_CART",
            payload:{
                products: updateCartList
            }
        })
    }

    const updateTotal = (products) =>{
        let total = 0;
        products.map((product) => total = total + product.price)

        dispatch({
            type: 'UPDATE_TOTAL',
            payload:{
                total: total
            }
        })
    }

    const value = {
        total: state.total,
        cartList: state.cartList,
        addToCart,
        removeFromCart
    }

    return(
        <CartContex.Provider value={value}>
            {children}
        </CartContex.Provider>
    )


}

export const useCart = () =>{
    const context = useContext(CartContex);
    return context;
}

