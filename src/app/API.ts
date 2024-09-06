import {environment} from "../environments/environment"

export const apiUrls = {
    usersApi: `${environment.API_BASE_URL}user/`,
    adminApi: `${environment.API_BASE_URL}admin/`,
    coordinatorApi: `${environment.API_BASE_URL}coordinator/`,
    tutorsApi: `${environment.API_BASE_URL}tutor/`
}