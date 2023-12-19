import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './Banner.scss';

export default class Banner extends Component {
  render() {
    return (
      <div className="home-banner">
        <div className="content-up">
          <div className="title1">
            <FormattedMessage id="banner.title1" />
          </div>
          <div className="title2">
            <FormattedMessage id="banner.title2" />
          </div>
          <div className="search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Tìm chuyên khoa" />
          </div>
        </div>
        <div className="content-down">
          <div className="options">
            <div className="option-child">
              <div className="icon-child">
                <i className="far fa-hospital"></i>
              </div>
              <div className="text-child">
                <FormattedMessage id="banner.check-specialty" />
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="text-child">
                <FormattedMessage id="banner.remote" />
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <i className="fas fa-procedures"></i>
              </div>
              <div className="text-child">
                <FormattedMessage id="banner.general" />
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <i className="fas fa-flask"></i>
              </div>
              <div className="text-child">
                <FormattedMessage id="banner.test" />
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="text-child">
                <FormattedMessage id="banner.mental" />
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <i className="fas fa-briefcase-medical"></i>
              </div>
              <div className="text-child">
                <FormattedMessage id="banner.dental" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
