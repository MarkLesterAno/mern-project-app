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
        return response ? response.data.user : null
    }
    getPermissions = async () => {
        const response = await this.get(`auth/me/permissions`,);
        return response ? response.data.permissions : null
    }
    invite_signup = async ({ email }: any) => {
        const response: any = await this.post("auth/invite", { email });
        return response ? response.data : null
    }
    complete_signup = async ({ email, username, password, token }: any) => {
        const response: any = await this.post(`auth/invite/${token}`, { email, username, password });
        return response ? response.data : null
    }
    reset_password = async ({ email }: any) => {
        const response: any = await this.post("auth/reset", { email });
        return response ? response.data : null
    }
    conplete_reset_password = async ({ new_password, reset_token }: any) => {
        const response: any = await this.post(`auth/reset/${reset_token}`, { new_password });
        return response ? response.data : null
    }

}

export default AuthService