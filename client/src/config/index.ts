

class Config {
    /**
     * api url endpoint
     * sample: http://localhost:3000/api
     */
    static API_BASEURL: string = import.meta.env.VITE_API_ENDPOINT ? import.meta.env.VITE_API_ENDPOINT : 'http://localhost:5000/api';
    static DEFAULT_TIMEZONE: string = import.meta.env.VITE_DEFAULT_TIMEZONE ? import.meta.env.VITE_DEFAULT_TIMEZONE : 'America/New_York';

}

export default Config;