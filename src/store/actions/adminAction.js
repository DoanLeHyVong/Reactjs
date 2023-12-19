import { toast } from "react-toastify";
import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailDoctorsService,
  getAllSpecialtyService,
  saveDetailInfoClinicService,
  getAllClinic,
  deleteClinicService,
} from "../../services/userService";

export const fetchGenderApi = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchGenderStart());
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderStart = () => ({
  type: actionTypes.FETCH_GENDER_START,
});

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  payload: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionApi = () => {
  return async (dispatch) => {
    try {
      let res = await getAllCodeService("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
    }
  };
};

export const fetchPositionStart = () => ({
  type: actionTypes.FETCH_POSITION_START,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  payload: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("fetch all user error");
        dispatch(fetchAllUsersFail());
      }
    } catch (e) {
      toast.error("fetch all user error");
      fetchAllUsersFail(e);
      console.log("fetchAllUsersFail error", e);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const fetchRoleApi = () => {
  return async (dispatch) => {
    try {
      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
    }
  };
};

export const fetchRoleStart = () => ({
  type: actionTypes.FETCH_ROLE_START,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  payload: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUserApi = (data) => {
  return async (dispatch) => {
    try {
      let res = await createNewUserService(data);
      console.log(res);
      if (res && res.errCode !== 0) {
        toast.success("Create a new user succeed!");
        dispatch(saveUserSuccess());
        dispatch(getAllUserApi());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
    }
  };
};

const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const getAllUserApi = () => {
  return async (dispatch) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(getAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users error!");
        dispatch(getAllUserFailed());
      }
    } catch (e) {
      toast.error("Fetch all users error!");
      dispatch(getAllUserFailed());
    }
  };
};

const getAllUserSuccess = (users) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  payload: users,
});

const getAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUserApi = (id) => {
  return async (dispatch) => {
    try {
      let res = await deleteUserService(id);
      console.log("check delete user redux: ", res);
      if (res && res.errCode !== 0) {
        toast.success("Delete user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(getAllUserApi());
      } else {
        toast.error("Delete user error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete user error!");
      dispatch(deleteUserFailed());
    }
  };
};

const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUserApi = (user) => {
  return async (dispatch) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode !== 0) {
        toast.success("Update user succeed!");
        dispatch(editUserSuccess());
        dispatch(getAllUserApi());
      } else {
        toast.error("Update user error!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update user error!");
      dispatch(editUserFailed());
    }
  };
};

const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const getTopDoctorsApi = () => {
  return async (dispatch) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

export const getAllDoctorsApi = () => {
  return async (dispatch) => {
    try {
      let res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDetailDoctorApi = (data) => {
  return async (dispatch) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save doctor detail succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save doctor detail error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save doctor detail error!");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const getDetailDoctorApi = (id) => {
  return async (dispatch) => {
    try {
      let res = await getDetailDoctorsService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const getAllScheduleTimeApi = () => {
  return async (dispatch) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};
export const saveDetailClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailInfoClinicService(data);
      if (res && res.errCode === 0) {
        toast.success("Save info clinic succeed!");
        dispatch({
          type: actionTypes.SAVE_INFO_CLINIC_SUCCESS,
        });
      } else {
        toast.error("Save info clinic failed");
        dispatch({
          type: actionTypes.SAVE_INFO_CLINIC_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save info clinic failed");
      dispatch({
        type: actionTypes.SAVE_INFO_CLINIC_FAILED,
      });
      console.log("save info clinic error", e);
    }
  };
};

export const getRequiredDoctorInforApi = () => {
  return async (dispatch) => {
    try {
      dispatch(getRequiredDoctorInforStart());

      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialtyService();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(getRequiredDoctorInforSuccess(data));
      } else {
        dispatch(getRequiredDoctorInforFailed());
      }
    } catch (e) {
      dispatch(getRequiredDoctorInforFailed());
    }
  };
};
export const deleteClinic = (clinicId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinicService(clinicId);
      if (res && res.errCode === 0) {
        toast.success("Delete a clinic succeed");
        dispatch(deleteClinicSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete a clinic error");
        dispatch(deleteClinicFail());
      }
    } catch (e) {
      toast.error("Delete a clinic error");
      deleteClinicFail(e);
      console.log("delete Clinic Fail error", e);
    }
  };
};
export const deleteClinicSuccess = () => ({
  type: actionTypes.DELETE_CLINIC_SUCCESS,
});
export const deleteClinicFail = () => ({
  type: actionTypes.DELETE_CLINIC_FAILED,
});

export const getRequiredDoctorInforStart = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
});

export const getRequiredDoctorInforSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  payload: data,
});

export const getRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
