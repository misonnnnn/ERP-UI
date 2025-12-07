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

  const getToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  const getUser = async (token) => {
    try {
      const res = await api.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      return null;
    }
  };

  useEffect(() => {
    async function init() {
      const token = getToken();

      if (!token) {
        setAuthLoading(false);
        return;
      }

      const u = await getUser(token);

      if (u) setIsLoggedIn(true);
      else setIsLoggedIn(false);

      setAuthLoading(false);
    }

    init();
  }, []);

  const login = async (token) => {
    document.cookie = `token=${token}; path=/; max-age=86400`; // 1 day
    setIsLoggedIn(true);

    await getUser(token);

    router.push("/hris/employee");
  };

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0"; // Deletes cookie

    setIsLoggedIn(false);
    setUser(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
