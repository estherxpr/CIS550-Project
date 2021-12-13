/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import "../style/menuBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Olympedia.svg";

export default class MenuNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navDivs: [],
        };
    }

    componentDidMount() {
        const pageList = ["2020 Olympics", "year", "country", "sports", "GDP", "health"];

        const navbarDivs = pageList.map((page, i) => {
            // eslint-disable-next-line react/prop-types
            let temp;
            if (page === '2020 Olympics') {
                temp = (
                    <a className="nav-item nav-link active" key={i} href={`/page/covidcountry`}>
                        {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
                    </a>
                );
            } else if (page === 'country') {
                temp = (
                    <a className="nav-item nav-link active" key={i} href={`/olympics/year/${page}`}>
                        {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
                    </a>
                );
            } else {
                temp = (
                    <a className="nav-item nav-link active" key={i} href={`/olympics/${page}`}>
                        {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
                    </a>
                );
            }

            return temp;
        });

        this.setState({
            navDivs: navbarDivs,
        });
    }

    render() {
        return (
            <div className="PageNavbar">
                <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                    <a className="navbar-brand">
                        <span className="img-container"><img
                            src={logo}
                            width="45"
                            height="45"
                            className="d-inline-block icon"
                            loading="lazy"
                        /></span>

                        <p className="web-name centered-and-flexed">Olympedia</p>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">{this.state.navDivs}</div>
                    </div>
                </nav>
            </div>
        );
    }
}
