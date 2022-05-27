import { useContext } from 'react'
import { StoreContext } from '../../utils/StoreContext'
import './Cart.scss'

const Cart = () => {
  const { cartItems, cartTotal } = useContext(StoreContext)
  return (
    cartTotal > 0 && (
      <div className="cart">
        <table className="cart__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(cartItems).map(({ id, name, price, quantity, total }) => {
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  <td>${price}</td>
                  <td>${total.toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total:</td>
              <td>${cartTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  )
}

export default Cart
