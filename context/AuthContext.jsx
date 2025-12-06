"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { redirect, useRouter } from "next/navigation";

export const AuthContext = createContext<any>(null);

export function AuthProvider() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
    if(token){
      getUser(token);
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    await getUser(token);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setIsAdminLoggedIn(false);
    // router.refresh()
    redirect('/');
  };

  const getUser = async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        if(data.user.role == 'admin'){
          setIsAdminLoggedIn(true)
        }
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

useEffect(() => {
  async function init() {
    const token = localStorage.getItem("token"); // string | null

    if (!token) {
      // No token = no user
      setIsAdminLoggedIn(false);
      setAuthLoading(true);
      return;
    }

    try {
      const u = await getUser(token);
      setIsAdminLoggedIn(u?.isAdmin ?? false);
      setIsLoggedIn(!!u);
      setUser(u);
    } catch (err) {
      console.error("Failed to load user", err);
      setIsAdminLoggedIn(false);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setAuthLoading(true);
    }
  }

  init();
}, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
