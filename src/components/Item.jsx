import styles from "./Item.module.css"
import { Card, CardBody, Button, FormCheck, Collapse} from "react-bootstrap"
import { useState, useContext } from "react"
import ModifyItem from "./ModifyItem"
import { listItemContext } from "../App"



function Item({itemdata}) {

    const {product, qnt, unit, price, id, checked} = itemdata

    const {listItems, setListItem} = useContext(listItemContext)

    const [activeEditForm, setActiveEditForm] = useState(false)

    function openEditForm() {
        setActiveEditForm(!activeEditForm)
      }

    function handleCheck() {

        const updatedList = listItems.map((item) => {
            if(item.id === id) {
                return {...item, checked: !checked}
            }
            return item
        })

    setListItem(updatedList)

    }

    function deleteItem(listItems, id) {
        
        const updatedList = listItems.filter((item) => item.id !== id)

        setListItem([...updatedList])
        
        if (updatedList.length === 0) return setListItem([])
       // console.log(updatedList)  
    }

    //flex-${width > 200 ? 'row' : 'column'}
    //flex-${prevWidth.current < width ? 'row' : 'column' }
    return(
           <Card className={styles.body}>

                <CardBody className="d-flex gap-3 justify-content-between align-items-center">
                {activeEditForm ? '' : <>
                    <FormCheck onClick={handleCheck} />
                    <div className={`d-flex gap-3 align-self-center flex-wrap`}>
                        {qnt > 0 ? <p id="qnt" className={` ${checked ? `${styles.strike} ${styles.p}` : styles.p}`}>{qnt} {unit}</p> : ''}
                        <p id="name" className={` ${checked ? `${styles.strike} ${styles.p}` : styles.p}`}>{product}</p> 
                        {price === '' ? '' : <p className={` ${checked ? `${styles.strike} ${styles.p}` : styles.p}`}>R$ {price}</p>}
                    </div>
                    <div className={`d-flex gap-2 justify-content-center flex-column`}>
                        {checked ? '' : <Button onClick={openEditForm} aria-controls="collapse-edit-form" aria-expanded={setActiveEditForm} variant="secondary">Editar</Button> }
                        <Button onClick={() => deleteItem(listItems, id)} variant="danger">Deletar</Button>
                    </div>
                    </>}
                        <Collapse in={activeEditForm}>
                            <div id="collapse-edit-form">
                                <ModifyItem openForm={openEditForm} activeForm={activeEditForm} confirmMsg={'Confirmar'} setActiveForm={setActiveEditForm} item={itemdata} />
                            </div>
                        </Collapse>
                
                </CardBody>
           </Card>
    )
}

export default Item