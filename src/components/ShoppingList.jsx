import Item from "./Item.jsx"
import styles from "./ShoppingList.module.css"
function ShoppingList({list, setListItem, openForm, deleteItem}) {
    return (
        <div className={`p-3 rounded d-flex flex-column gap-2 ${styles.background}`}>
            {list.map((item) => {return <Item setListItem={setListItem} openForm={openForm} list={list} key={item.id} itemdata={item} />} )}
        </div>
    )
}

export default ShoppingList