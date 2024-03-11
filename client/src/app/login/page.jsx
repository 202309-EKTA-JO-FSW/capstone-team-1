import Login from "../components/auth/login/Login";
import Cookies from "js-cookie";

const LoginPage = () => {
  console.log("TOKEN: ", Cookies.get("token"));
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
