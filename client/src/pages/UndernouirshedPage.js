import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";


import {
    Table,
    Row,
    Col,
    Divider, Select,

} from 'antd'
import "../style/table.css";
import {getUndernourishedRate} from '../healthFetcher'


import MenuNavBar from '../components/MenuNavBar';

const { Column } = Table;
const { Option } = Select;

class UndernourishedPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countryQuery: "",
            yearQuery: "",
            undernourishedResults: []
        }

        this.handleCountryQueryChange = this.handleCountryQueryChange.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)

    }

    handleCountryQueryChange(event) {
        this.setState({ countryQuery: event.target.value })
    }

    handleYearQueryChange(value) {
        this.setState({ yearQuery: value })

    }

    updateSearchResults() {
        getUndernourishedRate(this.state.countryQuery, this.state.yearQuery).then(res => {
            this.setState({ undernourishedResults: res.results })
        })
    }

    componentDidMount() {
        getUndernourishedRate(this.state.countryQuery, this.state.yearQuery).then(res => {
            this.setState({ undernourishedResults: res.results })
        })

    }

    render() {
        return (
            <div>
                <MenuNavBar />
                <div id="health">
                    <h2>Country's Undernourished Rate</h2></div>
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Country</label>
                            <FormInput placeholder="Country" value={this.state.countryQuery} onChange={this.handleCountryQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year</label>
                            <div><Select defaultValue="2016" style={{ width: 120 }} onChange={this.handleYearQueryChange}>
                                <Option value="2016">2016</Option>
                                <Option value="2012">2012</Option>
                                <Option value="2008">2008</Option>
                                <Option value="2004">2004</Option>
                                <Option value="2000">2000</Option>
                            </Select></div>

                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ backgroundColor: 'rgb(255, 146, 36)', marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Divider />
                <div className="container">
                    <Table class = "undernourished-table" dataSource={this.state.undernourishedResults} rowKey={obj=> obj.Country} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                        <Column title="Country" dataIndex="Country" key="Country" sorter= {(a, b) => a.Country.localeCompare(b.Country)}/>
                        <Column title="Year" dataIndex="Year" key="Year" sorter= {(a, b) => b.Year - a.Year}/>
                        <Column title="Undernourished Rate(%)" dataIndex="Undernourished_Rate" key="Undernourished_Rate" sorter= {(a, b) => b.Undernourished_Rate.toFixed(10)- a.Undernourished_Rate.toFixed(10)}/>
                        <Column title="Total Medals" dataIndex="total_medals" key="total_medals" sorter= {(a, b) => b.medals_numbers- a.medals_numbers}></Column>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UndernourishedPage

