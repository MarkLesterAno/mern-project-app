import APIService from "./APIService";

class PermissionService extends APIService {

    getAllPermissions = async () => {
        const response = await this.get(`permissions`);
        return response ? response.data : null;
    }
    getPermissions = async ({limit, page}:any) => {
        const response = await this.get(`permissions?limit=${limit}&page=${page}`);
        return response ? response.data : null;
    }

    getPermission = async ({ _id }: any) => {
        const response = await this.get(`permissions/${_id}`);
        return response ? response.data : null;
    }

    filterPermissions = async ({ filter, limit, page }: any) => {
        const response = await this.get(`permissions/search?filter=${filter}&limit=${limit}&page=${page}`);
        return response ? response.data : null;
    }

    createPermission = async ({ name, description }: any) => {
        const response = await this.post(`permissions/`, {
            name, description
        });
        return response ? response.data : null;
    }

    updatePermission = async ({ _id, name, description }: any) => {
        const response = await this.put(`permissions/${_id}`, {
            name, description
        });
        return response ? response.data : null;
    }

    patchPermission = async ({ _id, updateData }: any) => {
        const response = await this.patch(`permissions/${_id}`, updateData);
        return response ? response.data : null;
    }

    deletePermission = async ({ _id }: any) => {
        const response = await this.delete(`permissions/${_id}`);
        return response ? response.data : null;
    }

}

export default PermissionService;