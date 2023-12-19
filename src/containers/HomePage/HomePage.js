import React, { Component } from "react";
import HomeHeader from "./Header/HomeHeader";
import Banner from "./Banner/Banner";
import Specialty from "./Specialty/Specialty";
import MedicalFacility from "./MedicalFacility/MedicalFacility";
import OutstandingDoctor from "./OutstandingDoctor/OutstandingDoctor";
import About from "./About/About";
import HomeFooter from "./HomeFooter/HomeFooter";

import "slick-carousel/slick/slick.css";
import "./HomePage.scss";

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      <i className="fas fa-arrow-left"></i>
    </button>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      <i className="fas fa-arrow-right"></i>
    </button>
  );
}
export default class HomePage extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: <SamplePrevArrow />,
      nextArrow: <SampleNextArrow />,
    };
    return (
      <>
        <HomeHeader />
        <Banner />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutstandingDoctor settings={settings} />
        <About />
        <HomeFooter />
      </>
    );
  }
}
