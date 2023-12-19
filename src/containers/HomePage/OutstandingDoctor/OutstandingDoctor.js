import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import "./OutstandingDoctor.scss";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getTopDoctors();
  }

  render() {
    const { topDoctors, language } = this.props;
    console.log(this.props);
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container container">
          <div className="section-header">
            <h2 className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </h2>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              {topDoctors?.map((doctor, index) => {
                let imageBase64 = "";
                if (doctor.image) {
                  imageBase64 = new Buffer(doctor.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
                let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                return (
                  <Link
                    to={`/detail-doctor/${doctor.id}`}
                    className="section-item"
                    key={index}
                  >
                    <div className="outer-bg">
                      <div
                        className="bg-img section-outstanding-doctor"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      />
                    </div>
                    <div className="position text-center">
                      <div className="name">
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                      </div>

                      {/* {doctor.Doctor_Infor.specialtyData.name} */}
                    </div>
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

const mapStateToProps = (state) => ({
  language: state.app.language,
  topDoctors: state.admin.topDoctors,
});

const mapDispatchToProps = (dispatch) => ({
  getTopDoctors: () => dispatch(actions.getTopDoctorsApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
