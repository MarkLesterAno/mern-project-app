import APIService from "./APIService";

class AuthService extends APIService {

    login = async ({ username, password }: any) => {
        const response = await this.post("auth/login/", { username, password });
        return response ? response.data : null
    }
    logout = async () => {
        const response = await this.get("auth/logout");
        return response ? response.data : null
    }
    getUser = async () => {
        const response = await this.get(`auth/me/`,);
        return response ? response.data : null
    }
    getPermissions = async () => {
        const response = await this.get(`auth/me/permissions`,);
        return response ? response.data : null
    }
}

export default AuthService