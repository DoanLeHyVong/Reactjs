import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import moment from "moment";
import { getProfileDoctorsService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./ProfileDoctor.scss";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    const { doctorId } = this.props;
    console.log(doctorId);
    if (doctorId) {
      let res = await getProfileDoctorsService(doctorId);
      this.setState({
        dataProfile: res.data,
      });
    }
  }

  renderTimeBooking = (dataTime) => {
    const { language } = this.props;
    if (dataTime) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
  };

  render() {
    const { dataProfile } = this.state;
    const {
      language,
      doctorId,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
    } = this.props;
    let nameVi = `${dataProfile.positionData?.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    let nameEn = `${dataProfile.positionData?.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor container">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${dataProfile?.image})` }}
          ></div>
          <div className="content-right">
            <h3 className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </h3>
            <p className="down">
              {isShowDescriptionDoctor
                ? dataProfile?.Markdown?.description
                : this.renderTimeBooking(dataTime)}
            </p>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="patient.booking-modal.price" />
            {language === LANGUAGES.VI ? (
              <NumberFormat
                className="currency"
                value={dataProfile?.Doctor_Infor?.priceTypeData?.valueVi}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"VND"}
              />
            ) : (
              <NumberFormat
                className="currency"
                value={dataProfile?.Doctor_Infor?.priceTypeData?.valueEn}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
);
