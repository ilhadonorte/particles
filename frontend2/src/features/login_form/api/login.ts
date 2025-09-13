import { API_TOKEN_URL } from '../../../shared/config';
import { axiosInstance } from '../../../shared/api';
import { saveToken } from '../../../shared/auth/';


export const login = async (username: string, password: string) => {

// axios.postForm(url[, data[, config]])
const response = await axiosInstance.post(API_TOKEN_URL, { username, password })
    .then(function (response) {
    console.log("response satus: ", response.status);
    console.log("response data: ", response.data);
  })
  .catch(function (error) {
    console.log("Errou: ", error);
  });

}