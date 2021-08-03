import AuthInstance from "@/services/auth.instance";
import { USER } from "@/services/constants";

const AuthService = {
  login(data) {
    return AuthInstance.post(USER.LOGIN, data);
  },
};

export default AuthService;
