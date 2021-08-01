import AuthInstance from "@/services/auth.instance";
import { LOGIN } from "@/services/constants";

const AuthService = {
  login(data) {
    return AuthInstance.post(LOGIN, data);
  },
};

export default AuthService;
