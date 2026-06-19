import axios from "axios";

const api = axios.create({
  baseURL:
    "https://personal-finance-dashboard-production-e41c.up.railway.app/api",
});

export default api;