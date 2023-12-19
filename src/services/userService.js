import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

export const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};

export const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

export const deleteUserService = (id) => {
  return axios.delete(`/api/delete-user`, { data: { id } });
};

export const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};

export const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

export const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};

export const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};

export const getDetailDoctorsService = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

export const saveBulkScheduleDoctorService = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

export const getScheduleDoctorsService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

export const getExtraInforDoctorsService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

export const getProfileDoctorsService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

export const postPatientBookAppointmentService = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

export const postVerifyBookAppointmentService = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

export const createNewSpecialtyService = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

export const getAllSpecialtyService = () => {
  return axios.get(`/api/get-all-specialty`);
};

export const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
export const getDetailInfoDoctor = (inputId) => {
  return axios.get(`/api/get-detail-info-doctors-byId?id=${inputId}`);
};

export const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
export const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};
export const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
export const getDetailClinicById = (inputId) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${inputId}`);
};
export const getListPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

export const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
export const postPrescription = (data) => {
  return axios.post("/api/send-prescription", data);
};

export const saveDetailInfoClinicService = (data) => {
  return axios.post("/api/save-info-clinics", data);
};
export const deleteClinicService = (clinicId) => {
  return axios.delete(`/api/delete-clinic`, {
    data: {
      id: clinicId,
    },
  });
};

export default handleLoginApi;
