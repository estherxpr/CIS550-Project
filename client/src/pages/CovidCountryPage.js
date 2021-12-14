import React from 'react';
import {
    FormInput,
    FormGroup,
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
}
from "shards-react";

import {
    Table,
    Row,
    Col,
    Slider,
    Divider
} from 'antd'
//import { RadarChart } from 'react-vis';
//import { format } from 'd3-format';

import MenuNavBar from '../components/MenuNavBar';
import {
    getCovidCountrySearch,
    getCountryRankAvg,
    getCountryPerform,
    getCovidCountryMark,
} from '../covidFetcher';
//const wideFormat = format('.3r');

// render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
const CovidCountryColumns = [
    {
        title: 'Nation',
        dataIndex: 'Country',
        key: 'Country',
        sorter: (a, b) => a.Country.localeCompare(b.Country),
    },
    {
        title: 'Total Confirmation',
        dataIndex: 'total_confirmed',
        key: 'total_confirmed',
        sorter: (a, b) => a.total_confirmed - b.total_confirmed,
    },
    {
        title: 'Confirmed Rate',
        dataIndex: 'confirmed_rate',
        key: 'confirmed_rate',
        sorter: (a, b) => a.confirmed_rate - b.confirmed_rate,

    },
];

const CovidCountryMarkColumns = [
    {
        title: 'Nation',
        dataIndex: 'Country',
        key: 'Country',
        sorter: (a, b) => a.Country.localeCompare(b.Country),
    },
    {
        title: 'Confirmed Rate',
        dataIndex: 'confirmed_rate',
        key: 'confirmed_rate',
        sorter: (a, b) => a.confirmed_rate - b.confirmed_rate,

    },
    {
        title: 'Average',
        dataIndex: 'Mark',
        key: 'Mark',
        sorter: (a, b) => a.Mark.localeCompare(b.Mark),
    },
];

class CovidCountryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Country: '',
            ConfirmedRateLow: 0,
            ConfirmedRateHigh: 100,
            CovidCountryResults: [],
            CovidCountryMarkResults: [],
            showAnswer: false,
            questionCountry: 'Argentina',
            questionAnswer: null,
            questionAvg: null,
            userAnswer: null,
            showLeft: true,
        };
        this.handleSearchCountry = this.handleSearchCountry.bind(this);
        this.handleSearchConfirmedRate = this.handleSearchConfirmedRate.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
        this.showCard = this.showCard.bind(this);
        this.answerQuestionUpper = this.answerQuestionUpper.bind(this);
        this.answerQuestionLower = this.answerQuestionLower.bind(this);
        this.handleClickTotal = this.handleClickTotal.bind(this);
        this.handleClickAVG = this.handleClickAVG.bind(this);
    }

    handleClickTotal() {
        this.setState({ showLeft: true });
    }

    handleClickAVG() {
        this.setState({ showLeft: false });
    }

    handleSearchCountry(e) {
        this.setState({ Country: e.target.value });
    }

    handleSearchConfirmedRate(value) {
        this.setState({ ConfirmedRateLow: value[0] });
        this.setState({ ConfirmedRateHigh: value[1] });
    }

    updateSearchResults() {
        getCovidCountrySearch(this.state.Country, this.state.ConfirmedRateLow, this.state.ConfirmedRateHigh).then(res => {
            this.setState({ CovidCountryResults: res.results });
        });
    }

    showCard(country) {
        this.setState({ showAnswer: false });
        this.setState({ questionCountry: country });
        getCountryPerform(country).then(res => {
            this.setState({ questionAnswer: res.results[0] });
        });
        this.setState({ userAnswer: null });
    }

    answerQuestionUpper() {
        this.setState({ userAnswer: true });
        this.setState({ showAnswer: true });
    }

    answerQuestionLower() {
        this.setState({ userAnswer: false });
        this.setState({ showAnswer: true });
    }
    
    componentDidMount() {
        getCovidCountrySearch(this.state.Country, this.state.ConfirmedRateLow, this.state.ConfirmedRateHigh).then(res => {
            this.setState({ CovidCountryResults: res.results });
        });
        
        getCountryRankAvg().then(res => {
            this.setState({ questionAvg: res.results[0].average });
        });

        getCountryPerform(this.state.questionCountry).then(res => {
            this.setState({ questionAnswer: res.results[0] });
            this.setState({ userAnswer: null });
            this.setState({ showAnswer: false });
        });
        this.setState({ showLeft: true });

        getCovidCountryMark().then(res => {
            this.setState({ CovidCountryMarkResults: res.results });
        });
    }

    render() {
        return (
			<div>
                <MenuNavBar />
                <Row>
                    <Col span={6}>
                        <Row>
                            <ButtonGroup size="sm" className="mr-2" style={{margin: '15px 0px 0px 20px'}}>
                                <Button onClick={this.handleClickTotal} style={{backgroundColor:'#02DF82', border:'0'}}>
                                    Total
                                </Button>
                                <Button onClick={this.handleClickAVG} style={{backgroundColor:'#FF9224', border:'0'}}>
                                    AVG.
                                </Button>
                            </ButtonGroup>
                        </Row>
                        <Divider />
                        { this.state.showLeft
                          ? ( 
                            <div>
                                <Row justify='space-around'>
                                    <FormGroup style={{width: '40%', margin: '0px 0px 15px 0px' }}>
                                        <label>Search Nations</label>
                                        <FormInput placeholder="Country Name" value={this.state.Country} onChange={this.handleSearchCountry} />
                                    </FormGroup>
                                    <FormGroup style={{ margin: '0px 0px 15px 0px' }}>
                                        <label>Confirmed Rate</label>
                                        <Slider range defaultValue={[0, 100]} onChange={this.handleSearchConfirmedRate} />
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup style={{ margin: '0 auto' }}>
                                        <Button style={{ width: '100px', height: '30px', textAlign: 'center', lineHeight: '0px', backgroundColor: 'rgb(255, 146, 36)' }} onClick={this.updateSearchResults}>Search</Button>
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <Table onRow={(record, rowIndex) => {
                                        return {onClick: event => {this.showCard(record.Country)},};
                                    }} style={{ width: '100%', marginTop: '15px' }} dataSource={this.state.CovidCountryResults} columns={CovidCountryColumns} pagination={{ defaultPageSize: 8, simple: true }} rowKey={record=>record.Country}/>
                                </Row>
                            </div>
                          )
                          : (
                            <Row>
                              <Table onRow={(record, rowIndex) => {
                                return {onClick: event => {this.showCard(record.Country)},};
                                }} style={{ width: '100%', marginTop: '15px' }} dataSource={this.state.CovidCountryMarkResults} columns={CovidCountryMarkColumns} pagination={{ defaultPageSize: 8, simple: true }} rowKey={record=>record.Country}/>
                            </Row>
                          )}
                    </Col>
                    <Col span={18}>
                        <h2 style={{ maxWidth: '50vw', margin: '0 auto', marginTop: '80px' }}>
                            Test Your Instinct
                        </h2>
                        <p style={{ maxWidth: '50vw', margin: '0 auto', marginTop: '10px' }}>
                            Guess the performance of the country below is in Upper / Lower class for 2020 Tokyo Olympics
                        </p>
                        <Card style={{ maxWidth: '50vw', margin: '0 auto', marginTop: '50px'}}>
                            <CardHeader style={{backgroundColor: '#d9d9d9'}}>
                                <h3>{this.state.questionCountry}</h3>
                            </CardHeader>
                            <CardBody>
                                { this.state.showAnswer && this.state.questionAnswer
                                    ? (
                                        <Row>
                                            <Col offset={2} span={8}>
                                                <Row>
                                                    <h4 style={{color:'#EAC100'}}>Gold</h4>
                                                </Row>
                                                <Row>
                                                    <h5>{this.state.questionAnswer.Gold}</h5>
                                                </Row>
                                                <Row>
                                                    <h4 style={{color:'#9D9D9D'}}>Silver</h4>
                                                </Row>
                                                <Row>
                                                    <h5>{this.state.questionAnswer.Silver}</h5>
                                                </Row>
                                                <Row>
                                                    <h4 style={{color:'#984B4B'}}>Bronze</h4>
                                                </Row>
                                                <Row>
                                                    <h5>{this.state.questionAnswer.Bronze}</h5>
                                                </Row>
                                            </Col>
                                            <Col span={14}>
                                                <Row>
                                                    <h3 style={{marginRight:'20px'}}>Total Medals</h3>
                                                    <h4>{this.state.questionAnswer.Total_Medal}</h4>
                                                </Row>
                                                <Row style={{marginTop: '20px'}}>
                                                    <h3 style={{marginRight:'20px'}}>Ranking</h3>
                                                    <h4>{this.state.questionAnswer.Ranking}</h4>
                                                </Row>
                                                <Row style={{marginTop: '20px'}}>
                                                    <h2 style={{color:'#2894FF'}}>{this.state.questionAnswer.Ranking < this.state.questionAvg? 'Upper Class':'Lower Class'}</h2>
                                                </Row>
                                                <Row>
                                                    { this.state.userAnswer === (this.state.questionAnswer.Ranking < this.state.questionAvg)
                                                      ? (<h2 style={{color:'#00a600'}}>Correct!</h2>):(<h2 style={{color:'#ea0000'}}>Wrong!</h2>)}
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                    : (
                                        <h1 style={{ margin: '80px auto', textAlign: 'center', fontSize: '5em' }}>🔮</h1> 
                                    ) }
                            </CardBody>
                            <CardFooter style={{backgroundColor:'#d9d9d9'}}>
								<Row>
									<Col span={12}>
										<Row justify='center'>
											<Button onClick={this.answerQuestionUpper} style={{ backgroundColor: '#00A600', border: '0px' }}>Upper Class</Button>
										</Row>
									</Col>
									<Col span={12}>
										<Row justify='center'>
											<Button onClick={this.answerQuestionLower} style={{ backgroundColor: '#EA0000', border: '0px' }}>Lower Class</Button>
										</Row>
									</Col>
								</Row>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
			</div>
        );
    }
}

export default CovidCountryPage;

