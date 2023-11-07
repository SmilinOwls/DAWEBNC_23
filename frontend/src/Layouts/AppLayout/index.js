import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer'

const AppLayout = ({children}) => {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  )
}

export default AppLayout