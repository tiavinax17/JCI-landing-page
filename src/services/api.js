import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_APP_API_URL || 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // mi-assure anle cookie hitany back
});
//
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //
// //   return config;
// // });
//
// // It is just a template for now
//
// Auth API
export const authAPI ={
    login: (data) => api.post("/auth/login",data),
    me: () => api.get("/auth/me"),
    logout: () => api.post("/auth/logout"),
}
//
//Users API
export const usersAPI = {
    create: (data) => api.post("/users", data),
    getAll: () => api.get("/users"),
    // getBySlug: (slug) => api.get(`/jobs/${slug}`),
    update : (id, data) => api.put(`/users/${id}`,data),
    deleteById: (id) => api.delete(`/users/${id}`),
    updatePassword: (id, data) => api.put(`/users/${id}/password`, data),
}
//Organisation Locale API
export const organisationLocalesAPI = {
    getAll: () => api.get("/organisation-locales"),
}

//Bureau national API
export const bnAPI = {
    getAll: () => api.get("/bn"),
    create : (data) => api.post("/bn", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    update : (id, data) => api.put(`/bn/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    // getAllById : (id) => api.get(`/bn/${id}`),
    deleteById : (id) => api.delete(`/bn/${id}`),
}
//experiences API
export const pastPresidentAPI = {
    getAll: () => api.get("/past-presidents"),
    create : (data) => api.post("/past-presidents", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    update : (id, data) => api.put(`/past-presidents/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    deleteById : (id) => api.delete(`/past-presidents/${id}`),
}

export const zonesAPI = {
    getAll: () => api.get('/zones'),
    getByZoneName: (zoneName) => api.get(`/zones/${zoneName}`),
    getPsdByZoneId : (zoneId) => api.get(`/zones/presidents/${zoneId}`),
    create: (data) => api.post('/zones', data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    update: (id, data) => api.put(`/zones/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    deleteById: (id) => api.delete(`/zones/${id}`),
    createPsd: (data) => api.post(`/zones/presidents`, data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    updatePsd: (id, data) => api.put(`/zones/presidents/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    deletePsd: (id) => api.delete(`/zones/presidents/${id}`),

};

// Organisation Locale (OL) API
export const olAPI = {
    create : (data) => api.post("/organisation-locales", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    getAll : (zoneId) => api.get(`/organisation-locales/${zoneId}`),
    getById : (id) => api.get(`/organisation-locales/details/${id}`),
    // getBySlug: (slug) => api.get(`/organisation-locales/${slug}`),
    update : (id, data) => api.put(`/organisation-locales/${id}`,data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    deleteById : (id) => api.delete(`/organisation-locales/${id}`),

}
// servicesDetails API
export const contentAPI = {
    create : (data) => api.post("/organisation-locales/contents", data),
    getAll : (id) => api.get(`/organisation-locales/contents/${id}`),
    update : (id, data) => api.put(`/organisation-locales/contents/${id}`,data),
    deleteById : (id) => api.delete(`/organisation-locales/contents/${id}`),
}
//
//Membre de Bureau de l'Ol API
export const memberAPI = {
    getAll : (id) => api.get(`/organisation-locales/members/${id}`),
    create : (data) => api.post("/organisation-locales/members", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    update : (id,data) => api.put(`/organisation-locales/members/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    deleteById : (id) => api.delete(`/organisation-locales/members/${id}`),
}
//image Service details API
export const eventAPI = {
    getAllByOl: (olId) => api.get(`/events/organisation-locales/${olId}`),
    create : (data) => api.post("/events", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    update : (id, data) => api.put(`/events/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
    }),
    delete : (id) => api.delete(`/events/${id}`),
}
// //features API
// export const featuresAPI = {
//     create : (data) => api.post("/features", data),
//     getAllById : (id) => api.get(`/features/${id}`),
//     deleteById : (id) => api.delete(`/features/${id}`),
// }
// //engagement API
// export const engagementAPI = {
//     create : (data) => api.post("/engagements", data),
//     getAllById : (id) => api.get(`/engagements/${id}`),
//     deleteById : (id) => api.delete(`/engagements/${id}`),
// }