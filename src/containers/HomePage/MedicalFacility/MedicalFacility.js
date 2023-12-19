import React, { Component } from "react";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { getAllClinic } from "../../../services/userService";
import "./MedicalFacility.scss";

export default class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await getAllClinic();
      if (res && res.errCode === 0) {
        this.setState({
          dataClinic: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { dataClinic } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container container">
          <div className="section-header">
            <h2 className="title-section">
              <FormattedMessage id="homepage.clinic-popular" />
            </h2>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              {dataClinic?.map((item) => (
                <Link
                  className="section-item clinic-child"
                  key={item.id}
                  to={`/detail-clinic/${item.id}`}
                >
                  <div
                    className="bg-img section-clinic"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="clinic-name">{item.name}</div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
