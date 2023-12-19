import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getExtraInforDoctorsService } from "../../../services/userService";
import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    const { doctorId } = this.props;
    let res = await getExtraInforDoctorsService(doctorId);
    if (res && res.errCode === 0) {
      this.setState({
        extraInfor: res.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showHideDetailInfor = () => {
    this.setState({
      isShowDetailInfor: !this.state.isShowDetailInfor,
    });
  };

  render() {
    const { isShowDetailInfor, extraInfor } = this.state;
    const { language } = this.props;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </div>
          <div className="name-clinic">{extraInfor?.nameClinic}</div>
          <div className="detail-address">{extraInfor?.addressClinic}</div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false ? (
            <div className="short-infor">
              <FormattedMessage id="patient.extra-infor-doctor.price" />
              {language === LANGUAGES.VI ? (
                <NumberFormat
                  className="currency"
                  value={extraInfor?.priceTypeData?.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              ) : (
                <NumberFormat
                  className="currency"
                  value={extraInfor?.priceTypeData?.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              )}
              <span
                className="detail"
                onClick={() => this.showHideDetailInfor()}
              >
                <FormattedMessage id="patient.extra-infor-doctor.detail" />
              </span>
            </div>
          ) : (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-infor-doctor.price" />
              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                  </span>
                  <span className="right">
                    {language === LANGUAGES.VI ? (
                      <NumberFormat
                        className="currency"
                        value={extraInfor?.priceTypeData?.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    ) : (
                      <NumberFormat
                        className="currency"
                        value={extraInfor?.priceTypeData?.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    )}
                  </span>
                </div>
                <div className="note">{extraInfor?.note}</div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                {language === LANGUAGES.VI
                  ? extraInfor?.paymentTypeData?.valueVi
                  : extraInfor?.paymentTypeData?.valueEn}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor()}>
                  <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor)
);
