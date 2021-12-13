import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress, CardSubtitle } from "shards-react";


import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import {getSportsPerformance} from '../Countryfetcher'

import MenuNavBar from '../components/MenuNavBar';

const { Column, ColumnGroup } = Table;
// const { Option } = Select;


class SportsPages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sports: 'Swimmimg',
            country: 'USA',
            countryResults:[],
            countryInfo: null,
        }

        this.handleSportChange = this.handleSportChange.bind(this)
        this.handleCountryChange = this.handleCountryChange.bind(this)
        this.updateSportsCountry = this.updateSportsCountry.bind(this)
    }


    handleSportChange(event) {
        this.setState({sports:event.target.value})
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value})
    } 

    updateSportsCountry() {
        getSportsPerformance(this.state.sports, this.state.country).then(res => {
            this.setState({ countryResults: res.results })
            this.setState({ countryInfo: res.results[0] })
        })
    }

    componentDidMount() {
        getSportsPerformance(this.state.sports, this.state.country).then(res => {
            this.setState({ countryResults: res.results })
            this.setState({ countryInfo: res.results[0] })
        })
    }

    render() {
        return (
          <div>
            <MenuNavBar/>
            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sports</label>
                            <FormInput placeholder="Sports" onChange={this.handleSportChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Country</label>
                            <FormInput placeholder="Country" onChange={this.handleCountryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ backgroundColor: 'rgb(255, 146, 36)', marginTop: '4vh' }} onClick={this.updateSportsCountry}>Search</Button>
                        </FormGroup></Col>
                    </Row>                           
            </Form>
            {this.state.countryInfo ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Row gutter='30' align='middle' justify='center'>
                        <Col flex={2} style={{ textAlign: 'center' }}>
                            <h5>{this.state.countryInfo.Team}' Performance of {this.state.sports}</h5>
                        </Col>
                    </Row>
                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'center' }}>
                                    <h3>{this.state.countryInfo.Team}</h3>
                                    <h4>{this.state.countryInfo.NOC}</h4>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h6>Female</h6>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h6>Male</h6>
                                </Col >
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h3>{this.state.countryInfo.Female}</h3>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h3>{this.state.countryInfo.Male}</h3>
                                </Col >
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h6>Age</h6>
                                </Col >
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h3>{this.state.countryInfo.Age}</h3>
                                </Col >
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h6>Gold</h6>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    <h6>Silver</h6>
                                </Col >
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <h6>Bronze</h6>
                                </Col >
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h3>{this.state.countryInfo.Gold}</h3>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    <h3>{this.state.countryInfo.Silver}</h3>
                                </Col >
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <h3>{this.state.countryInfo.Bronze}</h3>
                                </Col >
                            </Row>
                        </CardBody>
                    </Card>                   
                </div> : null}
          </div>
        )
      }
}

export default SportsPages

