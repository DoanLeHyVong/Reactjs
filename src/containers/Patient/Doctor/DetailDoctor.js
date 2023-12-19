import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import DoctorSchedule from "../../Patient/Doctor/DoctorSchedule";
import DoctorExtraInfor from "../../Patient/Doctor/DoctorExtraInfor";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import "./DetailDoctor.scss";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDetailDoctor(id);
  }

  render() {
    const { detailDoctor, language } = this.props;
    let nameVi = `${detailDoctor.positionData?.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    let nameEn = `${detailDoctor.positionData?.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    return (
      <>
        <HomeHeader />
        <div className="doctor-detail-container ">
          <div className="intro-doctor container">
            <img className="content-left" src={detailDoctor?.image} alt="" />
            <div className="content-right">
              <h3 className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </h3>
              <p className="down">{detailDoctor?.Markdown?.description}</p>
            </div>
          </div>
          <div className="schedule-doctor container">
            <div className="row">
              <div className="content-left col-6">
                <DoctorSchedule doctorId={this.props.match.params.id} />
              </div>
              <div className="content-right col-6">
                <DoctorExtraInfor doctorId={this.props.match.params.id} />
              </div>
            </div>
          </div>
          <div className="detail-infor-doctor">
            <div
              className="container"
              dangerouslySetInnerHTML={{
                __html: detailDoctor?.Markdown?.contentHTML,
              }}
            ></div>
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  detailDoctor: state.admin.detailDoctor,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailDoctor: (id) => dispatch(actions.getDetailDoctorApi(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
