import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProfileInfo } from "../services/userService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");

    if (tokenFromURL) {
      sessionStorage.setItem("token", tokenFromURL);
      setToken(tokenFromURL);
      const newURL = location.pathname;
      window.history.replaceState({}, document.title, newURL);
    } else {
      const sessionToken = sessionStorage.getItem("token");
      if (sessionToken) {
        setToken(sessionToken);
      }
    }
  }, [location]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;

      try {
        setLoadingProfile(true);
        const data = await getProfileInfo();
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
        logout();
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [token]);

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setProfile(null);
    navigate("/");
  };

  const value = {
    token,
    setToken,
    profile,
    setProfile,
    loadingProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
