import APIService from "./APIService";

class GroupService extends APIService {

    getAllGroups = async () => {
        const response = await this.get(`groups`);
        return response ? response.data : null;
    }
    getGroups = async ({limit, page}:any) => {
        const response = await this.get(`groups?limit=${limit}&page=${page}`);
        return response ? response.data : null;
    }

    getGroup = async ({ _id }: any) => {
        const response = await this.get(`groups/group/${_id}`);
        return response ? response.data : null;
    }

    filterGroups = async ({ filter, limit, page}: any) => {
        const response = await this.get(`groups/search?filter=${filter}&limit=${limit}&page=${page}`);
        return response ? response.data : null;
    }

    createGroup = async ({ name, permissions }: any) => {
        const response = await this.post(`groups/`, {
            name, permissions
        });
        return response ? response.data : null;
    }

    updateGroup = async ({ _id, name, permissions }: any) => {
        const response = await this.put(`groups/${_id}`, {
            name, permissions
        });
        return response ? response.data : null;
    }

    patchGroup = async ({ _id, updateData }: any) => {
        const response = await this.patch(`groups/${_id}`, updateData);
        return response ? response.data : null;
    }

    deleteGroup = async ({ _id }: any) => {
        const response = await this.delete(`groups/${_id}`);
        return response ? response.data : null;
    }

}

export default GroupService;