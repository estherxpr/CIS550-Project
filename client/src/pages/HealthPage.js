import React from 'react';
import {
    Table,
    Pagination,
    Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import MenuNavBar from "../components/MenuNavBar";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

class HealthPage extends React.Component {

    render() {

        return (
            <div>
                <MenuNavBar />
                <div class="container">

                    <h3>Health</h3>

                    <div class="row">

                        <div class="col-sm-6">

                            <div class="card">

                                <img class="card-img-top" src="" alt="the image alt text here">

                                    <div class="card-body text-center">

                                        <h5 class="card-title">Services Title 1</h5>

                                        <p class="card-text text-left">Place some text for the service 1 here. </p>

                                        <a href="#" class="btn btn-warning">More info</a>

                                    </div></img>

                            </div>

                        </div>

                        <div class="col-sm-6">

                            <div class="card">

                                <img class="card-img-top" src="" alt="the image alt text here">

                                    <div class="card-body text-center">

                                        <h5 class="card-title">Services Title 2</h5>

                                        <p class="card-text text-left">Place some text for the service 2 here. </p>

                                        <a href="#" class="btn btn-warning">More info</a>

                                    </div></img>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
                    )
    }
                    }

export default HealthPage

