import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {}

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.userEdit) {
      // Trường hợp chỉnh sửa người dùng
      this.setState({
        id: nextProps.userEdit.id,
        email: nextProps.userEdit.email,
        password: "hardcode",
        firstName: nextProps.userEdit.firstName,
        lastName: nextProps.userEdit.lastName,
        address: nextProps.userEdit.address,
      });
    }
  }

  handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnSave = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      if (this.state.id) {
        // Gọi API chỉnh sửa người dùng
        this.props.editUser(this.state);
        this.forceUpdate(); // Cập nhật lại trang web sau khi chỉnh sửa thành công
      }
    }
  };

  render() {
    const { email, password, firstName, lastName, address } = this.state;
    const { isOpen, toggle, userEdit } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-user-container"
        size="lg"
      >
        <ModalHeader toggle={toggle}>
          {userEdit ? "Edit user" : null}
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={this.handleOnChangeInput}
                  disabled={userEdit ? true : false}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={this.handleOnChangeInput}
                  disabled={userEdit ? true : false}
                />
              </div>
              <div className="col-6">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleOnChangeInput}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleOnChangeInput}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={this.handleOnChangeInput}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {userEdit && (
            <Button
              color="primary"
              className="px-3"
              onClick={this.handleOnSave}
            >
              Edit
            </Button>
          )}
          <Button className="px-3" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
