import React from 'react';
import { HomeWrapper } from './Styling/Home';
import Header from './Header';
import Slider from './Slider';
import Specialization from './Specialization';
import WhyDiva from './WhyDiva';
import Testimonials from './Testimonials';
//import Footer from './Footer';
import Footer from "../includes/footer/Footer";
const Home = (props) => {
    return (
        <HomeWrapper>
            <Header />
            <div className="body-content">
                <Slider />
                <Specialization />
                <WhyDiva />
                <Testimonials />
            </div>
            <Footer />
        </HomeWrapper>
    )
}

export default Home;