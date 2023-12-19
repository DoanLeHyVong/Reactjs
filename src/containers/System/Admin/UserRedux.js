import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";

import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: CRUD_ACTIONS.CREATE,
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  handleOnchangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleOnchangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phonenumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = (e) => {
    e.preventDefault();
    let isValid = this.checkValidateInput();
    if (!isValid) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      // Call Api Create User
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        role: this.state.role,
        position: this.state.position,
        avatar: this.state.avatar,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      // Call Api Update User
      this.props.editUser({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        role: this.state.role,
        position: this.state.position,
        avatar: this.state.avatar,
      });
    }

    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      previewImgURL: "",
      action: CRUD_ACTIONS.CREATE,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCOE",
      firstName: user.firstName,
      lastName: user.lastName,
      phonenumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    const {
      previewImgURL,
      isOpen,
      email,
      password,
      firstName,
      lastName,
      phonenumber,
      address,
      role,
      gender,
      position,
    } = this.state;
    const { language, genders, positions, roles, isLoadingGender } = this.props;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isLoadingGender && "Loading gender"}
              </div>
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                    onChange={(e) => this.handleOnchangeInput(e, "email")}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                    onChange={(e) => this.handleOnchangeInput(e, "password")}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => this.handleOnchangeInput(e, "firstName")}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => this.handleOnchangeInput(e, "lastName")}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phonenumber}
                    onChange={(e) => this.handleOnchangeInput(e, "phonenumber")}
                  />
                </div>
                <div className="col-md-9">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apartment, studio, or floor"
                    value={address}
                    onChange={(e) => this.handleOnchangeInput(e, "address")}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => this.handleOnchangeInput(e, "gender")}
                  >
                    <option selected>Choose...</option>
                    {genders?.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    className="form-select"
                    value={position}
                    onChange={(e) => this.handleOnchangeInput(e, "position")}
                  >
                    <option selected>Choose...</option>;
                    {positions?.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => this.handleOnchangeInput(e, "role")}
                  >
                    <option selected>Choose...</option>
                    {roles?.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <label className="form-label">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      className="form-control"
                      hidden
                      onChange={(e) => {
                        this.handleOnchangeImg(e);
                      }}
                    />
                    <label htmlFor="previewImg" className="label-upload">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    {previewImgURL && (
                      <div
                        className="preview-image"
                        style={{ backgroundImage: `url(${previewImgURL})` }}
                        onClick={() => {
                          this.openPreviewImage();
                        }}
                      ></div>
                    )}
                  </div>
                </div>
                <div className="col-12 my-3">
                  <button
                    type="submit"
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={(e) => this.handleSaveUser(e)}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
              </form>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                />
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    roles: state.admin.roles,
    positions: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => {
      dispatch(actions.fetchGenderApi());
    },
    getPositionStart: () => {
      dispatch(actions.fetchPositionApi());
    },
    getRoleStart: () => {
      dispatch(actions.fetchRoleApi());
    },
    createNewUser: (data) => {
      dispatch(actions.createNewUserApi(data));
    },
    editUser: (user) => {
      dispatch(actions.editUserApi(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
