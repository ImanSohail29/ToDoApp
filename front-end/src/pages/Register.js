import RegisterComponent from './Components/RegisterComponent';
import axios from 'axios';

const register = async (username,password) => {
    console.log(username,password)
    const { data } = await axios.post("/api/users/register", {
      username,password
    });
    sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
    if (data.success === "User created") window.location.href = "/";
    return data;
  };
  
const Register = () => {
  return (
  <RegisterComponent register={register}></RegisterComponent>
  );
};

export default Register;
