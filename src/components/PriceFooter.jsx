import { useContext, useEffect, useState } from "react"
import { listItemContext, windowWidth } from "../App"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCalculator } from "@fortawesome/free-solid-svg-icons"
import styles from "./PriceFooter.module.css"

function PriceFooter() {

    const {listItems} = useContext(listItemContext)
    const [totalPrice, setTotalPrice] = useState(0)
    const [cart, setCart] = useState(0)
    const [shaking, setShaking] = useState(false)

    const width = useContext(windowWidth)

  function shakeTimer() {

    setShaking(true)
    setTimeout(() => {
      setShaking(false)
    }, 800);
  }

    useEffect(() => {
        if (listItems.length === 0) return setTotalPrice(0)
        
        const itemPrices = listItems.map((item) => {
            return item.total
          })

        setTotalPrice(parseFloat(itemPrices.reduce(function(acc, cur) {return acc + cur})).toFixed(2))
        
        function updateCart() {

          const cartAmount = listItems.filter(item => item.checked)
          if (cartAmount.length === 0) {
            shakeTimer()
            return setCart(0)}

          const cartSum = cartAmount.map((item) => {
            return item.total

          }).reduce(function(acc, cur) {return acc + cur})

          if (cart === cartSum) return
          setCart(cartSum)
          shakeTimer()
        }

        updateCart()

      }  , [listItems, cart])

    return (
        <div className={`d-flex ${width < 576 ? "fixed-bottom rounded-top bg-success justify-content-around" : "flex-row gap-3 row col-6" } p-3`}>
            
            <span className={`${width < 576? "d-flex gap-2 align-items-center " : "d-flex gap-2 align-items-center bg-success p-3 rounded" } ${styles.maxWidth}`}>
            <FontAwesomeIcon icon={faCalculator} size="lg" color="white" />
              <p>Total R$ {parseFloat(totalPrice).toFixed(2)}</p>
            </span>
            <span className={`${width < 576? "d-flex gap-2 align-items-center" : "d-flex gap-2 align-items-center bg-success p-3 rounded"} ${styles.maxWidth}`}>
              <FontAwesomeIcon icon={faCartShopping} size="lg"color="white" shake={shaking ? true : false} />
              <p>Carrinho R$ {parseFloat(cart).toFixed(2)}</p>
            </span>
        </div>
    )
}

export default PriceFooter