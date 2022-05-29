import { useContext } from 'react'
import { StoreContext } from 'provider/StoreContext'
import './_CartBubble.scss'

const CartBubble = () => {
  const { cartTotal } = useContext(StoreContext)

  return <i className="cartBubble">{cartTotal}</i>
}

export default CartBubble
