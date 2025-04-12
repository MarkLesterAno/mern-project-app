import APIService from "./APIService";

class CompanyService extends APIService {

    getComapnies = async ({ limit, page }: any) => {
        const response = await this.get(`companies?limit=${limit}&page=${page}`);
        return response ? response.data : null
    }
    filterComapnies = async ({ filter, limit, page }: any) => {
        const response = await this.get(`companies?filter${filter}&limit=${limit}&page=${page}`);
        return response ? response.data : null
    }

}

export default CompanyService