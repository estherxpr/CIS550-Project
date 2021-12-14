import React from 'react';
import {
    Table,
    Pagination,
    Select,
    Card
} from 'antd';
import "../style/Home.css";
import img1 from "./photos/img1.webp";
import img2 from "./photos/img2.jfif";
import img3 from "./photos/img3.webp";
import img4 from "./photos/img4.jfif";
import img5 from "./photos/img5.webp";
import img6 from "./photos/img6.jfif";
const { Column, ColumnGroup } = Table;
const { Option } = Select;


class HomePage extends React.Component {

    render() {

        return (
            

                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"
                                aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3"
                                aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4"
                                aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5"
                                aria-label="Slide 6"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="200">
                            <img src={img1} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Special title treatment</h5>
                                        <p className="card-text">With supporting text below as a natural lead-in to
                                            additional content.</p>
                                        <a href="/page/covidcountry" className="btn btn-primary btn-home">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src={img2} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Overview of the Olympics in different year</h5>
                                        <p className="card-text">Check out which country perform the best in each year Olympics</p>
                                        <a href="/olympics/year" className="btn btn-primary btn-home">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img3} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">The performance for a country in specific Olympic year</h5>
                                        <p className="card-text">How well did the country perform in different year, and what is the average age and gender ratio for the athletes of 
                                        the coutry in that year?</p>
                                        <a href="olympics/year/country" className="btn btn-primary btn-home">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img4} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">The performance for a country in differnt field of Sport</h5>
                                        <p className="card-text">How well did the country perform in different sports, and what is the average age and gender ratio for the athletes of 
                                        the coutry in that sport?</p>
                                        <a href="/olympics/sports" className="btn btn-primary btn-home">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img5} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Is GDP related to performance?</h5>
                                        <p className="card-text">GDP is an important indicator for a country's development, so would countries' with higher GDP also performed better?</p>
                                        <a href="/olympics/GDP" className="btn btn-primary btn-home">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        '<div className="carousel-item">
                        <img src={img6} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">How would a country's health level influence its performance?</h5>
                                    <p className="card-text">We choose the athletes' age and the percentage of undernourished population of a country to evaluate hea;th level? So does performance related to it?</p>
                                    <a href="/olympics/health" className="btn btn-primary btn-home">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


        )
    }
}

export default HomePage

