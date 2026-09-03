import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_APP_API_URL || 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // mi-assure anle cookie hitany back
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
    
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// It is just a template for now

// Auth API
export const authAPI ={
    login: (data) => api.post("/auth/login",data),
    me: () => api.get("/auth/me"),
    logout: () => api.post("/auth/logout"),
}

//job API
export const jobAPI = {
    create: (data) => api.post("/jobs", data),
    getAll: () => api.get("/jobs"),
    getBySlug: (slug) => api.get(`/jobs/${slug}`),
    update : (id, data) => api.put(`/jobs/${id}`,data),
    deleteById: (id) => api.delete(`/jobs/${id}`),
    count : () =>api.get("/services/count"),
}
//mission API
export const missionsAPI = {
    create : (data) => api.post("/missions", data),
    getAllById : (id) => api.get(`/missions/${id}`),
    deleteById : (id) => api.delete(`/missions/${id}`),
}
//missionPlus API
export const missionsPlusAPI = {
    create : (data) => api.post("/missions-plus", data),
    getAllById : (id) => api.get(`/missions-plus/${id}`),
    deleteById : (id) => api.delete(`/missions-plus/${id}`),
}
//experiences API
export const experiencesAPI = {
    create : (data) => api.post("/experiences", data),
    getAllById : (id) => api.get(`/experiences/${id}`),
    deleteById : (id) => api.delete(`/experiences/${id}`),
}
//settings API
export const settingsAPI = {
    create : (data) => api.post("/settings", data),
    getAll : () => api.get("/settings"),
    update : (id, data) => api.put(`/settings/${id}`,data),
    deleteById : (id) => api.delete(`/settings/${id}`),
}
// services API 
export const servicesAPI = {
    create : (data) => api.post("/services", data),
    getAll : () => api.get("/services"),
    getBySlug: (slug) => api.get(`/services/${slug}`),
    update : (id, data) => api.put(`/services/${id}`,data),
    deleteById : (id) => api.delete(`/services/${id}`),
    count : () =>api.get("/services/count"),
}
// servicesDetails API 
export const servicesDetailsAPI = {
    create : (data) => api.post("/service-details", data),
    getById : (id) => api.get(`/service-details/${id}`),
    getBySlug: (slug) => api.get(`/service-details/${slug}`),
    update : (id, data) => api.put(`/service-details/${id}`,data),
    deleteById : (id) => api.delete(`/service-details/${id}`),
}

//image generale API
export const imagesGeneralesAPI = {
    create : (data) => api.post("/image-generals", data),
    update : (id,data) => api.put(`/image-generals/${id}`, data),
}
//image Service details API
export const ImageServiceDetailAPI = {
    create : (data) => api.post("/image-service-details", data),
    delete : (id) => api.delete(`/image-service-details/${id}`),
}
//features API
export const featuresAPI = {
    create : (data) => api.post("/features", data),
    getAllById : (id) => api.get(`/features/${id}`),
    deleteById : (id) => api.delete(`/features/${id}`),
}
//engagement API
export const engagementAPI = {
    create : (data) => api.post("/engagements", data),
    getAllById : (id) => api.get(`/engagements/${id}`),
    deleteById : (id) => api.delete(`/engagements/${id}`),
}