import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    Pagination,
    Row,
    Col,
    Divider, Select,

} from 'antd'
import "../style/table.css";
import { getGDPSearch } from '../healthFetcher'


import MenuNavBar from '../components/MenuNavBar';

const { Column } = Table;
const { Option } = Select;

class GdpPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countryQuery: "",
            yearQuery: "",
            gdpResults: [],
            selectedCountry: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedYear: window.location.search ? window.location.search.substring(1).split('=')[3] : 0,
            selectedCountryDetails: null

        }

        this.handleCountryQueryChange = this.handleCountryQueryChange.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToCountry = this.goToCountry.bind(this)

    }

    handleCountryQueryChange(event) {
        console.log("country");
        console.log(this.state.countryQuery);
        this.setState({ countryQuery: event.target.value })
    }

    handleYearQueryChange(value) {
        console.log(value);
        this.setState({ yearQuery: value })

    }
    goToCountry(country) {
         window.location = `/GDP/countries?Country=${country}`
    }

    updateSearchResults() {
        getGDPSearch(this.state.countryQuery, this.state.yearQuery).then(res => {
            this.setState({ gdpResults: res.results })
        })
    }

    componentDidMount() {
        getGDPSearch(this.state.countryQuery, this.state.yearQuery).then(res => {
            this.setState({ gdpResults: res.results })
        })

        // getGDP(this.state.selectedCountry).then(res => {
        //     this.setState({ selectedCountryDetails: res.results[0] })
        // })
    }

    render() {
        return (
            <div>
                <MenuNavBar />
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
                <Table class = "GDP-table" onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {this.goToCountry(record.Country,record.Year)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
                    };
                }} dataSource={this.state.gdpResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                        <Column title="Country" dataIndex="Country" key="Country_gdp" sorter= {(a, b) => a.Country.localeCompare(b.Country)}/>
                        <Column title="Year" dataIndex="Year" key="Year_gdp" sorter= {(a, b) => b.Year - a.Year}/>
                        <Column title="GDP" dataIndex="GDP" key="GDP" sorter= {(a, b) => b.GDP.toFixed(10) - a.GDP.toFixed(10)}/>
                        <Column title="Total Medals" dataIndex="medals_numbers" key="medals_numbers" sorter= {(a, b) => b.medals_numbers- a.medals_numbers}/>
                </Table>
                    </div>
            </div>
        )
    }
}

export default GdpPage

