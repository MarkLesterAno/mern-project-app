import APIService from "./APIService";

class UserService extends APIService {

    getUsers = async ({ limit, page }: any) => {
        const response = await this.get(`users?limit=${limit}&page=${page}`);
        return response ? response.data : null;
    }

    getUser = async ({ _id }: any) => {
        const response = await this.get(`users/user/${_id}`);7
        return response ? response.data : null;
    }

    filterUsers = async ({ filter, limit, page }: any) => {
        const response = await this.get(`users/search?filter=${filter}&limit=${limit}&page=${page}`);
        return response ? response.data : null;
    }

    createUser = async ({ email, username, password }: any) => {
        const response = await this.post(`users/`, {
            email, username, password
        });
        return response ? response.data : null;
    }

    updateUser = async ({ _id, email, username, isActive, isStaff, isSuperuser }: any) => {
        const response = await this.put(`users/${_id}`, {
            email, username, isActive, isStaff, isSuperuser
        });
        return response ? response.data : null;
    }

    patchUser = async ({ _id, updateData }: any) => {
        const response = await this.patch(`users/${_id}`, updateData);
        return response ? response.data : null;
    }

    deleteUser = async ({ _id }: any) => {
        const response = await this.delete(`users/${_id}`);
        return response ? response.data : null;
    }

}

export default UserService