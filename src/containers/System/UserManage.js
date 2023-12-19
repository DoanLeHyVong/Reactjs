import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import "./UserManage.scss";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      userEdit: null,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  handleDeleteUser = async (id) => {
    try {
      let res = await deleteUserService(id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
        this.forceUpdate();
      } else {
        console.error(res.errMessage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      userEdit: user,
      isOpenModalUser: true,
    });
  };

  editUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode !== 0) {
        console.error(res.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        this.forceUpdate();
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { arrUsers, isOpenModalUser, userEdit } = this.state;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={isOpenModalUser}
          toggle={this.toggleUserModal}
          editUser={this.editUser}
          userEdit={userEdit}
        />
        <div className="title text-center">Manage users</div>
        <div className="mx-1"></div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers?.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => {
                        this.handleEditUser(user);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleDeleteUser(user.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
