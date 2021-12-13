import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { getAllCountriesOfYear} from '../Countryfetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;
// const { Option } = Select;
  
  const columns = [
    {
      title: 'Country',
      dataIndex: 'Team',
      key: 'Team',
      sorter: (a, b) => a.Team.localeCompare(b.Team),
    },
    {
      title: 'NOC',
      dataIndex: 'NOC',
      key: 'NOC',
      sorter: (a, b) => a.NOC.localeCompare(b.NOC),
    },
    {
      title: 'Gold',
      dataIndex: 'Gold',
      key: 'Gold',
      sorter: (a, b) => a.Gold - b.Gold,
    },
    {
        title: 'Silver',
        dataIndex: 'Silver',
        key: 'Silver',
        sorter: (a, b) => a.Silver - b.Silver,
    },
    {
        title: 'Bronze',
        dataIndex: 'Bronze',
        key: 'Bronze',
        sorter: (a, b) => a.Bronze - b.Bronze,
    },
      
  ];


class YearPages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            year: 2016,
            country: 'USA',
            yearResults: [],
        }

        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleCountryChange = this.handleCountryChange.bind(this)
        this.updateYearResults = this.updateYearResults.bind(this)
    }


    handleYearChange(event) {
        this.setState({year:parseInt(event.target.value)})
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value})
    } 

    updateYearResults(event) {  
        this.setState({year:parseInt(event.target.value)})
        getAllCountriesOfYear(this.state.year).then(res => {
            this.setState({ yearResults: res.results })
        }) 
    }

    componentDidMount() {

        getAllCountriesOfYear(this.state.year).then(res => {
            this.setState({ yearResults: res.results })
        })
    }

    render() {
        return (
          <div>
            <MenuBar/>
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <Row gutter='30' align='middle' justify='center'>
                    <Col flex={2} style={{ textAlign: 'center' }}>
                        <h3>The {this.state.year} Olympics</h3>
                    </Col>
                </Row>
                <Row gutter='30' align='middle' justify='center'>
                    <select style={{ width: 120 }} onChange={this.updateYearResults}>
                    <option selected value="2016">2016</option>
                    <option value="2012">2012</option>
                    <option value="2008">2008</option>
                    <option value="2004">2004</option>
                    <option value="2000">2000</option>
                    </select>
                </Row>   
                <Table dataSource={this.state.yearResults} columns={columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
            </div>
            
          </div>
        )
      }
}

export default YearPages

