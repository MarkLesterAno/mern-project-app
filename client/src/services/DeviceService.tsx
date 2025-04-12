import APIService from "./APIService";

class DeviceService extends APIService {

    getDevices = async ({ limit, page }: any) => {
        const response = await this.get(`devices?limit=${limit}&page=${page}`);
        return response ? response.data : null
    }
    getDevice = async ({ _id }: any) => {
        const response = await this.get(`devices/${_id}`);
        return response ? response.data : null
    }
    filterComapnies = async ({ filter, limit, page }: any) => {
        const response = await this.get(`devices?filter${filter}&limit=${limit}&page=${page}`);
        return response ? response.data : null
    }
    createDevice = async ({ name, mac_address, ip_address, username, password }: any) => {
        const response = await this.post(`devices/`, {
            name, mac_address, ip_address, username, password
        });
        return response ? response.data : null
    }

    updateDevice = async ({ _id, name, mac_address, ip_address, username, password }: any) => {
        const response = await this.put(`devices/${_id}`, {
            name, mac_address, ip_address, username, password
        });
        return response ? response.data : null
    }

    deleteDevice = async ({ _id }: any) => {
        const response = await this.delete(`devices/${_id}`);
        return response ? response.data : null
    }

    getInterfaces = async ({ _id }: any) => {
        const response = await this.get(`devices/${_id}/interface/list`);
        return response ? response.data : null
    }
    getInterfaceResource = async ({ _id, option }: any) => {
        const response = await this.get(`devices/${_id}/interface/${option}/list`);
        return response ? response.data : null
    }
    getIpResource = async ({ _id, option }: any) => {
        const response = await this.get(`devices/${_id}/ip/${option}/list`);
        return response ? response.data : null
    }
    manageInterfaceResource = async ({ _id, option, action }: any) => {
        const response = await this.get(`devices/${_id}/interface/${option}/${action}`);
        return response ? response.data : null
    }
    manageIpResource = async ({ _id, option, action }: any) => {
        const response = await this.get(`devices/${_id}/ip/${option}/${action}`);
        return response ? response.data : null
    }


}

export default DeviceService