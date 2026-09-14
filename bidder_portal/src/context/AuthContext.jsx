import { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });

  function login(authResponse) {
    localStorage.setItem("token", authResponse.token);       
    localStorage.setItem("authUser", JSON.stringify(authResponse));
    setUser(authResponse); 
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
} 