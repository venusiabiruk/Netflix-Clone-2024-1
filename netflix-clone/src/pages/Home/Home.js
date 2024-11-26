import React from 'react'
import Header from '../../components/Header/Header'
import Banner from "../../components/Banner/Banner";
import Footer from '../../components/Footer/Footer'
import RowList from '../../components/Row/RowList/RowList';


const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <RowList/>
      <Footer />
    </>
  );
}

export default Home
