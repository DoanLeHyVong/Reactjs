import React, { Component } from "react";
import "./HomeFooter.scss";

export default class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2023 VongDoan.
          <a
            target="_blank"
            href="https://github.com/DoanLeHyVong"
            rel="noreferrer"
          >
            {" "}
            More information
          </a>
        </p>
      </div>
    );
  }
}
