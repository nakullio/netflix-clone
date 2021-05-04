import axios from 'axios'

// when we make a request, we add basedUrl automatically to simplify process
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export default instance