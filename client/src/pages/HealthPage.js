import React from 'react';

import MenuNavBar from "../components/MenuNavBar";
import youngest from "./olympics_youngest.jpg";
import undernourished from "./undernourished.jpg";

class HealthPage extends React.Component {

    render() {

        return (
            <div>
                <MenuNavBar/>
                <div style={{
                    width: '70vw',
                    margin: '0 auto',
                    marginTop: '5vh',
                    marginBottom: '10vh',
                    paddingBottom: '10vh'
                }} className="container">
                    <div className="health"><h2>Health</h2></div>

                    <p className="health-detail"><strong>Usually, the health of athletes, and the country's health
                        condition would have influences on country's performance. Let's explore more details about
                        them!</strong></p>
                    <div className="row">

                        <div className="col-sm-6">

                            <div className="card">

                                <img src={youngest} alt="young athlete"/>

                                <div className="card-body text-center">

                                    <h5 className="card-title">Athletes' Age Details</h5>
                                    <p className="card-text text-left"></p>
                                    <a style={{color: "#ffffff", background: "#66CDAA"}} href="/olympics/health/age"
                                       className="btn btn-warning">Explore More</a>

                                </div>

                            </div>

                        </div>

                        <div className="col-sm-6">

                            <div className="card">

                                <img src={undernourished} alt-text="undernourished"/>

                                <div className="card-body text-center">

                                    <h5 className="card-title">Country's Undernourished Rate</h5>
                                    <p className="card-text text-left"></p>
                                    <a href="/olympics/health/undernourished" className="btn btn-warning">Explore
                                        More</a>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default HealthPage

