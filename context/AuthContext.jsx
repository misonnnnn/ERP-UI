"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Fetch logged-in user via token
  const getUser = async (token) => {
    try {
      const res = await api.get("/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      return null;
    }
  };

  // Initialize on first load
  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      const u = await getUser(token);

      if (u) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }

      setAuthLoading(false);
    }

    init();
  }, []);

  // Login function
  const login = async (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    await getUser(token);

    router.push("/hris/employee");
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
