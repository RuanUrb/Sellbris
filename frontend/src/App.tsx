import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import Header from './layouts/header'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`

function App() {

  return (
    <>
        <Container>
          <Routes>
            <Header/>
            {/*

              DEFINE ROUTES : '/', '/PRODUCT-12315847', 'FORM TO PRODUCT', 'FORM TO REGISTER', 'FORM TO LOGIN', 'COMMENT SECTION', 'USER-489478213' 

            */ }
          </Routes>
        </Container>      
    </>
  )
}

export default App
