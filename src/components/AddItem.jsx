import { Form, FormControl, FormSelect, FormLabel, Button } from "react-bootstrap"
import styles from "./AddItem.module.css"

import { useState } from "react"

function AddItem({openForm, activeForm, setListItem, listItems, item, confirmMsg}) {

    const [formData, setFormData] = useState({
        product: `${item ? item.product : ''}` ,
        qnt: item ? item.qnt : '',
        unit: `${item ? item.unit : 'un'}`,
        price: item ? item.price : '',
        checked: item ? true : false
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
            }));

    };


    function handleSubmit(e) {
        e.preventDefault()
        const formDataWID = {...formData, id: Date.now() }

        setListItem([...listItems, formDataWID])
        //console.log(formData)

        setFormData({
            product: '',
            qnt: '',
            unit: '',
            price: '',
        })

    }

    return (
            <div className={`p-3 rounded ${styles.background}`}>
                <Form onSubmit={handleSubmit} className="d-grid gap-4">

                    <h1 className="text-center fs-4"> Novo Produto :)</h1>

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
                    <Button onClick={openForm} aria-controls="collapse-form" aria-expanded={activeForm}>Fechar</Button>

                    </div>
                </Form>
            </div>
    )
}

export default AddItem