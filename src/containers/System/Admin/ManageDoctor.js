import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import { getDetailDoctorsService } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      specialtyId: "",
      clinicId: "",
    };
  }

  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  static getDerivedStateFromProps(newProps, currentState) {
    const { allDoctors, allRequiredDoctorInfor, language } = newProps;
    const { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
      allRequiredDoctorInfor;
    const { listDoctors, listPrice } = currentState;

    if (allDoctors !== listDoctors || allRequiredDoctorInfor !== listPrice) {
      const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
          if (type === "USERS") {
            inputData.forEach((item) => {
              let object = {};
              let labelVi = `${item.lastName} ${item.firstName}`;
              let labelEn = `${item.firstName} ${item.lastName}`;
              object.label = language === LANGUAGES.VI ? labelVi : labelEn;
              object.value = item.id;
              result.push(object);
            });
          }
          if (type === "PRICE") {
            inputData.forEach((item) => {
              let object = {};
              let labelVi = `${item.valueVi}`;
              let labelEn = `${item.valueEn} USD`;
              object.label = language === LANGUAGES.VI ? labelVi : labelEn;
              object.value = item.keyMap;
              result.push(object);
            });
          }
          if (type === "PAYMENT" || type === "PROVINCE") {
            inputData.forEach((item) => {
              let object = {};
              let labelVi = `${item.valueVi}`;
              let labelEn = `${item.valueEn}`;
              object.label = language === LANGUAGES.VI ? labelVi : labelEn;
              object.value = item.keyMap;
              result.push(object);
            });
          }
          if (type === "SPECIALTY") {
            inputData.forEach((item) => {
              let object = {};
              object.label = item.name;
              object.value = item.id;
              result.push(object);
            });
          }
          if (type === "CLINIC") {
            inputData.forEach((item) => {
              let object = {};
              object.label = item.name;
              object.value = item.id;
              result.push(object);
            });
          }
        }
        return result;
      };

      let dataSelectDoctor = buildDataInputSelect(allDoctors, "USERS");
      let dataSelectPrice = buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = buildDataInputSelect(resProvince, "PROVINCE");
      let dataSelectSpecialty = buildDataInputSelect(resSpecialty, "SPECIALTY");
      let dataSelectClinic = buildDataInputSelect(resClinic, "CLINIC");
      return {
        ...currentState,
        listDoctors: dataSelectDoctor,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      };
    }
    return currentState;
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown() {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      specialtyId: this.state.selectedSpecialty.value,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : 0,
    });
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    const { listPrice, listProvince, listPayment, listSpecialty, listClinic } =
      this.state;
    let res = await getDetailDoctorsService(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markDown = res.data.Markdown;
      let nameClinic = "",
        addressClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty = "",
        selectedClinic = "";

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;

        selectedPayment = listPayment.find((item) => item.value === paymentId);
        selectedPrice = listPrice.find((item) => item.value === priceId);
        selectedProvince = listProvince.find(
          (item) => item.value === provinceId
        );
        selectedSpecialty = listSpecialty.find(
          (item) => item.value === specialtyId
        );
        selectedClinic = listClinic.find((item) => item.value === clinicId);
      }

      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkdown: markDown.contentMarkdown,
        description: markDown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedClinic: "",
        selectedSpecialty: "",
        selectedProvince: "",
        selectedPrice: "",
      });
    }
  };

  handleChangeSelectDoctorInfor = (selectedOption, name) => {
    let setName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[setName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeText = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      selectedDoctor,
      description,
      listDoctors,
      contentMarkdown,
      hasOldData,
      listPrice,
      listPayment,
      listProvince,
      listSpecialty,
      listClinic,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      selectedSpecialty,
      selectedClinic,
      nameClinic,
      addressClinic,
      note,
    } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeSelect}
              options={listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              value={description}
              onChange={this.handleOnchangeText}
              name="description"
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
              name="selectedProvince"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleOnchangeText}
              name="nameClinic"
              value={nameClinic}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleOnchangeText}
              name="addressClinic"
              value={addressClinic}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleOnchangeText}
              name="note"
              value={note}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </label>
            <Select
              value={selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listSpecialty}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.specialty" />
              }
              name="selectedSpecialty"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">
              <FormattedMessage id="admin.manage-doctor.select-clinic" />
            </label>
            <Select
              value={selectedClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listClinic}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              }
              name="selectedClinic"
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <FormattedMessage id="admin.manage-doctor.save" />
          ) : (
            <FormattedMessage id="admin.manage-doctor.add" />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => {
      dispatch(actions.getAllDoctorsApi());
    },
    getAllRequiredDoctorInfor: () => {
      dispatch(actions.getRequiredDoctorInforApi());
    },
    saveDetailDoctor: (data) => {
      dispatch(actions.saveDetailDoctorApi(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
