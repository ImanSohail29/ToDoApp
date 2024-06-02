import LoginComponent from './Components/LoginComponent';
import axios from 'axios';

const login = async (username, password) => {
    const { data } = await axios.post("/api/users/login", { username, password });
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
     return data;
}
const Login = () => {
  return <LoginComponent login={login}></LoginComponent>;
};

export default Login;
