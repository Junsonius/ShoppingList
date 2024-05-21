import { listItemContext } from "../App.jsx"
import Item from "./Item.jsx"
import styles from "./ShoppingList.module.css"

import { useContext } from "react"

function ShoppingList({ openForm, deleteItem}) {

    const {listItems} = useContext(listItemContext)

    return (
        <div className={`p-3 rounded row row-cols-1 row-cols-md-2 row-cols-xl-3 gap-2 ${styles.background} `}>
            {listItems.map((item) => {return <Item openForm={openForm} key={item.id} itemdata={item} />} )}
        </div>
    )
}

export default ShoppingList