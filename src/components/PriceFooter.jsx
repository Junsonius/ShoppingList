import { useContext, useEffect, useState } from "react"
import { listItemContext } from "../App"


function PriceFooter() {

    const {listItems} = useContext(listItemContext)

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if (listItems.length === 0) return setTotalPrice(0)
        const itemPrices = listItems.map((item) => {
            return item.price * item.qnt
          })

        setTotalPrice(parseFloat(itemPrices.reduce(function(acc, cur) {return acc + cur})).toFixed(2))
      }, [listItems])


      useEffect(() => {

      })

    return (
        <div>
            
            <h2>Sua compra terá um valor total de R$ {totalPrice} reais</h2>
        </div>
    )
}

export default PriceFooter