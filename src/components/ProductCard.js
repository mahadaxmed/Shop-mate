import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
export const ProductCard = ({product}) => {
  const {name, price, image} = product;
  const [isCart, setIsCart] = useState(false)

  const { addToCart, removeFromCart, cartList } = useCart();

  useEffect(()=>{
   const cartItem = cartList.find(cart => cart.id === product.id)

   if(cartItem){
    setIsCart(true)
   }else{
    setIsCart(false)
   }
  },[cartList, product.id])

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {
          isCart ? (<button className="remove" onClick={()=>removeFromCart(product)}>Remove</button>) : (<button onClick={()=>addToCart(product)}>Add To Cart</button>)
        }
      </div>
    </div>
  )
}
