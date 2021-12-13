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
import {getUndernourishedRate} from '../healthFetcher'


import MenuBar from '../components/MenuBar';

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
    goToCountry(country,year) {
        window.location = `/GDP/countries?Country=${country}&Year=${year}`
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
                <MenuBar />
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
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Divider />
                <div className="container">
                    <Table class = "GDP-table" onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {this.goToCountry(record.Country,record.Year)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
                        };
                    }} dataSource={this.state.undernourishedResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                        <Column title="Country" dataIndex="Country" key="Country" sorter= {(a, b) => a.Country.localeCompare(b.Country)}/>
                        <Column title="Year" dataIndex="Year" key="Year" sorter= {(a, b) => b.Year - a.Year}/>
                        <Column title="Undernourished Rate" dataIndex="Undernourished_Rate" key="Undernourished_Rate" sorter= {(a, b) => b.Undernourished_Rate.toFixed(10)- a.Undernourished_Rate.toFixed(10)}/>
                        <Column title="Total Medals" dataIndex="total_medals" key="total_medals" sorter= {(a, b) => b.medals_numbers- a.medals_numbers}></Column>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UndernourishedPage

