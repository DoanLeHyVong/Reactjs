import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorsService } from "../../../services/userService";
import BookingModal from "../../Patient/Doctor/Modal/BookingModal";
import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    const { language, doctorId } = this.props;
    let allDays = this.getArrDays(language);
    if (allDays && allDays.length > 0) {
      let res = await getScheduleDoctorsService(doctorId, allDays[0].value);
      this.setState({
        allDays,
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays,
      });
    }
  }

  handleOnchangeSelect = async (e) => {
    const { doctorId } = this.props;
    let date = e.target.value;
    let res = await getScheduleDoctorsService(doctorId, date);
    if (res && res.errCode === 0) {
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    const {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    const { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handleOnchangeSelect(e)}>
              {allDays?.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calender">
              <span>
                <i className="fas fa-calendar-alt"></i>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvailableTime?.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className={
                            language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                          }
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.detail-doctor.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
          doctorId={this.props.doctorId}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  detailDoctor: state.admin.detailDoctor,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
);
