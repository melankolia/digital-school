import AuthInstance from "@/services/auth.instance";
import { USER } from "@/services/constants";

const AuthService = {
  login(data, auth) {
    return AuthInstance.post(USER.LOGIN, data, { auth });
  },
};

export default AuthService;
