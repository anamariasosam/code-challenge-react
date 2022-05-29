import { useContext } from 'react'
import { StoreContext } from '../../../utils/StoreContext'
import './_CartBubble.scss'

const CartBubble = () => {
  const { cartTotal } = useContext(StoreContext)

  return <i className="cartBubble">{cartTotal}</i>
}

export default CartBubble
