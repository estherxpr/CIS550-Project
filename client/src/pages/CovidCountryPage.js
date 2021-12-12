import React from 'react';
import { 
    Form,
    FormInput,
    FormGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardFooter,
    Progress,
}
from "shards-react";

import {
    Layout,
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import {
    getCovidCountrySearch,
    getCountryRankAvg,
    getCountryPerform,
} from '../covidFetcher';
const wideFormat = format('.3r');
const { Header, Footer, Sider, Content } = Layout;

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


class CovidCountryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Country: '',
            ConfirmedRateLow: 0,
            ConfirmedRateHigh: 100,
            CovidCountryResults: [],
            showAnswer: false,
            questionCountry: 'Argentina',
            questionAnswer: null,
            questionAvg: null,
            userAnswer: null,
        };
        this.handleSearchCountry = this.handleSearchCountry.bind(this);
        this.handleSearchConfirmedRate = this.handleSearchConfirmedRate.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
        this.showCard = this.showCard.bind(this);
        this.answerQuestionUpper = this.answerQuestionUpper.bind(this);
        this.answerQuestionLower = this.answerQuestionLower.bind(this);
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
            console.log(res.results[0].Total_Medal);
            this.setState({ questionAnswer: res.results[0] });
            this.setState({ userAnswer: null });
            this.setState({ showAnswer: false });
        });
    }

    render() {
        return (
			<div>
                <MenuBar />
                <Row>
                    <Col span={6}>
                        <Row>
                            <FormGroup style={{  margin: '15px 0px 15px 20px' }}>
                                <label>Search Nations</label>
                                <FormInput placeholder="Country Name" value={this.state.Country} onChange={this.handleSearchCountry} />
                            </FormGroup>
                            <FormGroup style={{ margin: '15px 0px 15px 20px' }}>
                                <label>Confirmed Rate</label>
                                <Slider range defaultValue={[0, 100]} onChange={this.handleSearchConfirmedRate} />
                            </FormGroup>
                            <FormGroup style={{ margin: 'auto 60px' }}>
                                <Button style={{ height: '30px', textAlign: 'center', lineHeight: '0px' }} onClick={this.updateSearchResults}>Search</Button>
                            </FormGroup>
                        </Row>
                        <Row>
                            <Table onRow={(record, rowIndex) => {
                                return {onClick: event => {this.showCard(record.Country)},};
                            }} style={{ width: '100%', marginTop: '15px' }} dataSource={this.state.CovidCountryResults} columns={CovidCountryColumns} pagination={{ defaultPageSize: 8, simple: true }}/>
                        </Row>
                    </Col>
                    <Col span={18}>
                        <h2 style={{ maxWidth: '50vw', margin: '0 auto', marginTop: '80px' }}>
                            Test Your Instinct
                        </h2>
                        <p style={{ maxWidth: '50vw', margin: '0 auto', marginTop: '10px' }}>
                            Guess the performance of the country below is in Upper / Lower class for 2020 Tokyo Olympics
                        </p>
                        <Card style={{ maxWidth: '50vw', margin: '0 auto', marginTop: '50px'}}>
                            <CardHeader>
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
                                                    { this.state.userAnswer == (this.state.questionAnswer.Ranking < this.state.questionAvg)
                                                      ? (<h2 style={{color:'#00a600'}}>Correct!</h2>):(<h2 style={{color:'#ea0000'}}>Wrong!</h2>)}
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                    : (
                                        <h1 style={{ margin: '50px auto', textAlign: 'center', fontSize: '5em' }}>🔮</h1> 
                                    ) }
                            </CardBody>
                            <CardFooter>
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

