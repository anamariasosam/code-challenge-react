import { useStore } from 'provider/StoreContext'
import './_CartBubble.scss'

const CartBubble = () => {
  const {
    state: { cartTotal },
  } = useStore()

  return <i className="cartBubble">{cartTotal}</i>
}

export default CartBubble
