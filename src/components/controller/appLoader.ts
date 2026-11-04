import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!apiUrl) {
            throw new Error('API_URL is not configured in .env');
        }

        if (!apiKey) {
            throw new Error('API_KEY is not configured in .env');
        }

        super(apiUrl, { apiKey });
    }
}

export default AppLoader;
