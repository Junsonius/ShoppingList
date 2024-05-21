/* eslint-disable react-refresh/only-export-components */
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header"
import AddItem from "./components/AddItem"
import ShoppingList from "./components/ShoppingList"
import './App.css'
import PriceFooter from './components/PriceFooter';

import { useState, createContext, useEffect } from 'react';

import { Container, Button, Collapse, Modal, ModalBody} from 'react-bootstrap';

// eslint-disable-next-line react-refresh/only-export-components
export const listItemContext = createContext()
export const windowWidth = createContext()

function App() {

const [listItems, setListItem] = useState([{product: 'Bananananan', qnt: "2", unit: "kg", price: 12.00 , total: 24, checked: false, id: 1}, {product: 'potatooo', qnt: "1", unit: "kg", price: 0 , total: 0, checked: false, id: (2)}, {product: 'Bananananan', qnt: "1", unit: "kg", price: 12.00,  total: 12, checked: false, id: 3}, {product: 'potatooo', qnt: "1", unit: "kg", price: 6.00,  total: 6 , checked: false, id: (4)}])
const [activeForm, setActiveForm] = useState(false)
const [activeModal, setActiveModal] = useState(false)
const [width, setWidth] = useState(window.innerWidth)

useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

console.log(listItems)

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
    <windowWidth.Provider value={width}>

    <Container className='min-vh-100 mb-5'>
      <Header />
      
      <Container className='row justify-content-center align-items-center gap-3 mt-5 h-50'>
      <listItemContext.Provider value={{listItems, setListItem}}>
        {activeForm ? '' : <Button onClick={openForm} aria-controls="collapse-form" aria-expanded={activeForm} variant='primary' className='align-self-center col-6 col-md-3'>Adicionar Produto</Button> }
          <Collapse in={activeForm}>
            <div id="collapse-form">
              <div className='d-flex justify-content-center'>
              <AddItem openForm={openForm} activeForm={activeForm} confirmMsg={'Adicionar'} />
              </div>
            </div>
          </Collapse>
        {
          listItems.length === 0 ? '' : <> <ShoppingList  openForm={openForm} />
          <Button className={`col-3 mb-2 order-last p-2`} onClick={handleShow} variant='danger'>Limpar Lista</Button>
          <PriceFooter />
        </>}
      </listItemContext.Provider>
      </Container>

      <Modal show={activeModal} onHide={handleClose}>
        <ModalBody className='d-flex align-items-center bg-dark rounded text-white gap-2'>
          Tem certeza que quer apagar todos os itens da lista?
          <Button onClick={handleClose} variant='secondary'>cancelar</Button>
          <Button onClick={clearList} variant='danger'>Apagar Lista</Button>
        </ModalBody>
      </Modal>
    </Container>
    
    </windowWidth.Provider>


  )
}

export default App
