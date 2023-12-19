import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);
export default class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  handleOnchangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnchangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewClinic = async () => {
    console.log("check state", this.state);
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new clinic succeed!");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Something went wrong...");
      console.log(res);
    }
  };

  render() {
    const { name, address, descriptionMarkdown } = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="menu.admin.manage-clinic" />
        </div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="menu.admin.clinic" />
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={this.handleOnchangeInput}
            />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="menu.admin.photo-clinic" />
            </label>
            <input
              className="form-control"
              type="file"
              onChange={this.handleOnchangeImg}
            />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="menu.admin.address-clinic" />
            </label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={address}
              onChange={this.handleOnchangeInput}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewClinic()}
            >
              <FormattedMessage id="menu.admin.save-clinic" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
