import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import logo from "../../../assets/logo.svg";
import { changeLanguageApp } from "../../../store/actions";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { language } = this.props;
    return (
      <div className="home-header-container container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fas fa-bars"></i>
            <Link to="/home" className="header-logo">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="center-content">
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="home-header.specialty" />
                </b>
              </div>
              <div className="subs-title">
                <FormattedMessage id="home-header.search-doctor" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="home-header.health-facility" />
                </b>
              </div>
              <div className="subs-title">
                <FormattedMessage id="home-header.select-room" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="home-header.doctor" />
                </b>
              </div>
              <div className="subs-title">
                <FormattedMessage id="home-header.select-doctor" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="home-header.fee" />
                </b>
              </div>
              <div className="subs-title">
                <FormattedMessage id="home-header.check-health" />
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="support">
              <i className="fas fa-question-circle"></i>
              <FormattedMessage id="home-header.support" />
            </div>
            <div
              className={
                language === LANGUAGES.VI ? "language-vi active" : "language-vi"
              }
            >
              <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
            </div>
            <div
              className={
                language === LANGUAGES.EN ? "language-en active" : "language-en"
              }
            >
              <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
