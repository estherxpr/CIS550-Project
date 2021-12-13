import React from 'react';
import {
    Table,
    Pagination,
    Select,
    Card
} from 'antd'

import MenuBar from '../components/MenuBar';
import MenuNavBar from "../components/MenuNavBar";
import youngest from "./olympics_youngest.jpg";
import undernourished from "./undernourished.jpg";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

class HealthPage extends React.Component {

    render() {

        return (
            <div>
                <MenuNavBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh', marginBottom:'10vh', paddingBottom:'10vh'}} className="container">

                    <h3>Health</h3>

                    <div className="row">

                        <div className="col-sm-6">

                            <div className="card">

                                <img src={youngest} alt="the image alt text here"/>

                                    <div className="card-body text-center">

                                        <h5 className="card-title">Services Title 1</h5>

                                        <p className="card-text text-left">Place some text for the service 1 here. </p>

                                        <a style={{color:"#ffffff", background:"#66CDAA"}} href="/olympics/health/age" className="btn btn-warning">Explore More</a>

                                    </div>

                            </div>

                        </div>

                        <div className="col-sm-6">

                            <div className="card">

                                <img src={undernourished}/>

                                    <div className="card-body text-center">

                                        <h5 className="card-title">Services Title 2</h5>

                                        <p className="card-text text-left">Place some text for the service 2 here. </p>

                                        <a href="/olympics/health/undernourished" className="btn btn-warning">Explore More</a>

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

