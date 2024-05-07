import { Form, FormControl, FormSelect, FormLabel, Button } from "react-bootstrap"
import styles from "./AddItem.module.css"

import { useState, useContext } from "react"
import { listItemContext } from "../App"

function ModifyItem({openForm, activeForm, item, confirmMsg, id}) {


    const {listItems, setListItem} = useContext(listItemContext)

    const [formData, setFormData] = useState({
        id: item.id, 
        product: `${item ? item.product : ''}` ,
        qnt: item ? item.qnt : '',
        unit: `${item ? item.unit : ''}`,
        price: item ? item.price : '',
        checked: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
            }));

    };
    
    
    function updateItem(e) {

        e.preventDefault()

        const updatedList = listItems.map((item) => {
            if(item.id === formData.id) {
                console.log(formData)

                return formData
            }
            return item
        })
        
        setListItem([...updatedList])

        openForm()
    }

    return (
            <div className={`p-3 rounded ${styles.background}`}>
                <Form onSubmit={updateItem} className="d-grid gap-4">
                    <FormControl required type="text" name="product" className="textColor" value={formData.product} onChange={handleChange} placeholder="adicione aqui seu produto"></FormControl>
                    <div>
                    <FormLabel>Quantidade (opcional)</FormLabel>
                    <div className="d-flex gap-1">
                    <FormControl  type="number" name="qnt" className="textColor" value={formData.qnt} onChange={handleChange} placeholder="1,2,3..."></FormControl>
                    <FormSelect name="unit" value={formData.unit} onChange={handleChange}  className="w-75">
                        <option value="un">Unidade(s)</option>
                        <option value="kg">Kg</option>
                        <option value="g">g</option>
                        <option value="L">L</option>
                        <option value="ml">Ml</option>
                    </FormSelect>

                    </div>
                    </div>
                    <div>
                    <FormLabel>Preço (opcional)</FormLabel>
                    <FormControl type="number" name='price' onChange={handleChange} value={formData.price} className="textColor"  placeholder="Qual o valor? (por Kg, un.)"></FormControl>
                    </div>
                    <div className="d-flex justify-content-around">
                    <Button type="submit">{confirmMsg}</Button>
                    <Button onClick={openForm} aria-controls="collapse-edit-form" aria-expanded={activeForm}>Fechar</Button>

                    </div>
                </Form>
            </div>
    )
}

export default ModifyItem