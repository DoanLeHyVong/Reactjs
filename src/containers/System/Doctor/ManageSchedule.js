import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { toast } from "react-toastify";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { saveBulkScheduleDoctorService } from "../../../services/userService";
import "./ManageSchedule.scss";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllScheduleTime();
  }

  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.allDoctors !== currentState.listDoctors) {
      const buildDataInputSelect = (inputData) => {
        let result = [];
        const { language } = newProps;
        if (inputData && inputData.length > 0) {
          inputData.map((item, index) => {
            let object = {};
            let labelVi = `${item.lastName} ${item.firstName}`;
            let labelEn = `${item.firstName} ${item.lastName}`;
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
            result.push(object);
          });
        }
        return result;
      };
      let dataSelect = buildDataInputSelect(newProps.allDoctors);
      return { ...currentState, listDoctors: dataSelect };
    }
    return currentState;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      const { allScheduleTime } = this.props;
      let data = allScheduleTime?.map((item) => ({
        ...item,
        isSelected: false,
      }));
      this.setState({ rangeTime: data });
    }
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    const { rangeTime } = this.state;
    let data = rangeTime?.map((item) => {
      if (item.id === time.id) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    this.setState({
      rangeTime: data,
    });
  };

  handleSaveSchedule = async () => {
    const { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }

    let formatedDate = new Date(currentDate).getTime();
    let selectedTime = rangeTime?.filter((item) => item.isSelected === true);
    if (selectedTime && selectedTime.length > 0) {
      selectedTime?.forEach((item) => {
        let object = {};
        object.doctorId = selectedDoctor.value;
        object.date = formatedDate;
        object.timeType = item.keyMap;
        result.push(object);
      });
    } else {
      toast.error("Invalid selected time!");
      return;
    }
    let res = await saveBulkScheduleDoctorService({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Save info succeed!");
    } else {
      toast.error("error saveBulkScheduleDoctor");
    }
  };

  render() {
    const { listDoctors, selectedDoctor, currentDate, rangeTime } = this.state;
    const { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChangeSelect}
                options={listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnchangeDatePicker}
                value={currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime?.map((item, index) => {
                return (
                  <button
                    key={item.id}
                    className={
                      item.isSelected === true
                        ? "btn btn-schedule active"
                        : "btn btn-schedule"
                    }
                    onClick={() => this.handleClickBtnTime(item)}
                  >
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </button>
                );
              })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => {
      dispatch(actions.getAllDoctorsApi());
    },
    getAllScheduleTime: () => {
      dispatch(actions.getAllScheduleTimeApi());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
