import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "./api";
import { User, UserContext } from "./types";

const AuthContext = createContext<UserContext>({
  user: undefined,
  getUser: () => undefined,
  setUser: () => undefined,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  const getUser = async () => {
    await api.get("/user").then((resp) => {
      setUser(resp.data);
    });
  };

  useEffect(() => {
    getUser();
  }, [document.cookie]);

  return (
    <AuthContext.Provider value={{ user, getUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
