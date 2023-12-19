import React, { Component } from "react";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { getAllSpecialtyService } from "../../../services/userService";
import "./Specialty.scss";

export default class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialtyService();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }

  render() {
    const { dataSpecialty } = this.state;
    return (
      <div className="section-share section-specialty">
        <div className="section-container container">
          <div className="section-header">
            <h2 className="title-section">
              <FormattedMessage id="homepage.popular-specialty" />
            </h2>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              {dataSpecialty?.map((item) => {
                return (
                  <Link
                    className="section-item specialty-child"
                    key={item.id}
                    to={`/detail-specialty/${item.id}`}
                  >
                    <div
                      className="bg-img section-specialty"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="specialty-name">{item.name}</div>
                  </Link>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
