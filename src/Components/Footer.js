import React from "react";
import { connect } from "react-redux";

require('./Footer.less');

class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
                <div className="container">
                    <p>С <img src="images/heart.png" /> от <a href="https://loonywizard.github.io" target="_blank">Вовы</a></p>
                </div>
            </div>
        );
    }
}

export default Footer;