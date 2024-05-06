import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header"
import AddItem from "./components/AddItem"
import ShoppingList from "./components/ShoppingList"
import './App.css'

import { useState } from 'react';

import { Container, Button, Collapse, Modal, ModalBody} from 'react-bootstrap';

function App() {

const [listItems, setListItem] = useState([{product: 'Bananananan', qnt: 1, unit: "kg", price: '6', checked: false, id: Date.now()}, {product: 'potatooo', qnt: 1, unit: "kg", price: '6', checked: false, id: (Date.now()+1)}])
const [activeForm, setActiveForm] = useState(false)
const [activeModal, setActiveModal] = useState(false)

//console.log(listItems)

function openForm() {
  setActiveForm(!activeForm)
}

function clearList() {
  setListItem([])
  setActiveModal(false)

  //console.log(listItems)
}


const handleClose = () => setActiveModal(false);
const handleShow = () => setActiveModal(true);

  return (
    <Container className='min-vh-100 p-3'>
      <Header />
      
      <Container className='d-flex flex-column gap-3 mt-5 h-50'>
        {activeForm ? '' : <Button onClick={openForm} aria-controls="collapse-form" aria-expanded={activeForm} variant='primary' className='w-50 align-self-center'>Adicionar Produto</Button> }
          <Collapse in={activeForm}>
            <div id="collapse-form">
              <AddItem openForm={openForm} activeForm={activeForm} setListItem={setListItem} listItems={listItems} confirmMsg={'Adicionar'} />
            </div>
          </Collapse>
        {listItems.length === 0 ? '' : <ShoppingList list={listItems} openForm={openForm} setListItem={setListItem}  /> }
      {listItems.length === 0 ? '' : <Button className='w-25 align-self-end' onClick={handleShow} variant='danger'>Limpar Lista</Button>}
      </Container>

      <Modal show={activeModal} onHide={handleClose}>
        <ModalBody className='d-flex align-items-center bg-dark rounded text-white gap-2'>
          Tem certeza que quer apagar todos os itens da lista?
          <Button onClick={handleClose} variant='secondary'>cancelar</Button>
          <Button onClick={clearList} variant='danger'>Apagar Lista</Button>
        </ModalBody>
      </Modal>
    </Container>


  )
}

export default App
