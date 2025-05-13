import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token, role, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    setUser({ role, userId });
  };

  const logout = () => {
    localStorage.removeItem(token);
    localStorage.removeItem(role);
    localStorage.removeItem(userId);
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (token) {
      setUser({ role, userId });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
