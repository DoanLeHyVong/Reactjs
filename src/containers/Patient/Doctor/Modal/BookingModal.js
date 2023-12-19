import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { postPatientBookAppointmentService } from "../../.././../services/userService";
import "./BookingModal.scss";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
    };
  }

  componentDidMount() {
    this.props.getGenders();
    const { doctorId } = this.props;
    if (doctorId) {
      this.setState({ doctorId: doctorId });
    }
  }

  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.genders !== currentState.genders) {
      const buildDataGender = (inputData) => {
        let result = [];
        const { language } = newProps;
        if (inputData && inputData.length > 0) {
          inputData.forEach((item, index) => {
            let object = {};
            object.label =
              language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            object.value = item.keyMap;
            result.push(object);
          });
        }
        return result;
      };
      let dataSelect = buildDataGender(newProps.genders);
      return {
        ...currentState,
        genders: dataSelect,
        timeType: newProps.dataTime.timeType,
      };
    }
    return currentState;
  }

  handleOnchangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedGender) => {
    this.setState({ selectedGender });
  };

  buildTimeBooking = (dataTime) => {
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
      return `${time} - ${date}`;
    }
  };

  buildDoctorName = (dataTime) => {
    const { language } = this.props;
    if (dataTime) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
  };

  handleConfirmBooking = async () => {
    //validate input
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientBookAppointmentService({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!");
      this.props.closeBookingModal();
    } else {
      toast.error("Booking a new appointment error!");
    }
  };

  render() {
    const { isOpenModal, closeBookingModal, dataTime } = this.props;
    const {
      fullName,
      phoneNumber,
      email,
      address,
      reason,
      birthday,
      genders,
      selectedGender,
      doctorId,
    } = this.state;
    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={fullName}
                  onChange={this.handleOnchangeInput}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleOnchangeInput}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={this.handleOnchangeInput}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={this.handleOnchangeInput}
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="reason"
                  value={reason}
                  onChange={this.handleOnchangeInput}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnchangeDatePicker}
                  value={birthday}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  value={selectedGender}
                  onChange={this.handleChangeSelect}
                  options={genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={this.handleConfirmBooking}
            >
              <FormattedMessage id="patient.booking-modal.btnConfirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="patient.booking-modal.btnCancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  genders: state.admin.genders,
});

const mapDispatchToProps = (dispatch) => ({
  getGenders: () => dispatch(actions.fetchGenderApi()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookingModal)
);
