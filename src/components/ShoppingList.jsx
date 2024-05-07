import { listItemContext } from "../App.jsx"
import Item from "./Item.jsx"
import styles from "./ShoppingList.module.css"

import { useContext } from "react"

function ShoppingList({ openForm, deleteItem}) {

    const {listItems} = useContext(listItemContext)

    return (
        <div className={`p-3 rounded d-flex flex-column gap-2 ${styles.background}`}>
            {listItems.map((item) => {return <Item openForm={openForm} key={item.id} itemdata={item} />} )}
        </div>
    )
}

export default ShoppingList