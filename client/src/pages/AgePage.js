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
import { getAgeSearch } from '../healthFetcher'

import MenuNavBar from '../components/MenuNavBar';

const { Column } = Table;
const { Option } = Select;
const ageColumns = [
    {
        title: 'Country',
        dataIndex: 'Country',
        key: 'Country_age',
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        //render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
    },
    {
        title: 'Year',
        dataIndex: 'Year',
        key: 'Year_age',
        sorter: (a, b) => (b.Year - a.Year)
    },
    {
        title: 'avg_age',
        dataIndex: 'avg_age',
        key: 'avg_age',
        sorter: (a, b) => a.avg_age.toFixed(6) - b.avg_age.toFixed(6)

    },
    {
        title: 'min_age',
        dataIndex: 'min_age',
        key: 'min_age',
        sorter: (a, b) => a.min_age - b.min_age

    },
    {
        title: 'max_age',
        dataIndex: 'max_age',
        key: 'max_age',
        sorter: (a, b) => a.max_age - b.max_age

    },
    {
        title: 'Total Medals',
        dataIndex: 'total_medals',
        key: 'total_medals',

    }
];

class AgePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countryQuery: "",
            yearQuery: "",
            sportQuery:"",
            ageResults: [],
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
        //console.log(value);
        this.setState({ yearQuery: value })
    }
    
    handleSportQueryChange(event) {
        //console.log(event);
        this.setState({ countryQuery: event.target.value })
    }

    goToCountry(country) {
        window.location = `/olympics/health/age?Country=${country}`
    }

    updateSearchResults() {
        getAgeSearch(this.state.countryQuery, this.state.yearQuery).then(res => {
            this.setState({ ageResults: res.results })
        })
    }

    componentDidMount() {
        getAgeSearch(this.state.countryQuery, this.state.yearQuery).then(res => {
            this.setState({ ageResults: res.results })
        })

        // getAge(this.state.selectedCountry).then(res => {
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
                            <div>
                            <Select defaultValue="2016" style={{ width: 120 }} onChange={this.handleYearQueryChange}>
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
                    <Table class = "Age-table" columns={ageColumns} onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {this.goToCountry(record.Country,record.Year)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
                        };
                    }} dataSource={this.state.ageResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                    </Table>
                </div>
            </div>
        )
    }
}

export default AgePage

