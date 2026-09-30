import axios from 'axios'

// Instance Axios unique : tous les appels API passent par ici
const http = axios.create({
    baseURL: '/api',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
    },
})

// Gestion centralisée des erreurs d'authentification / de droits
http.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status

        if (status === 401) {
            // Session expirée ou non connecté
        } else if (status === 403) {
            // Action non autorisée pour ce rôle
        }

        return Promise.reject(error)
    },
)

export default http
