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

  // Read token from URL (for OAuth2 users) or from localStorage
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");

    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      setToken(tokenFromURL);

      // Remove token from URL for clean address bar
      const newURL = location.pathname;
      window.history.replaceState({}, document.title, newURL);
    } else {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      }
    }
  }, [location]);

  // Fetch profile if token is available
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;

      try {
        setLoadingProfile(true);
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const data = await getProfileInfo();
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
        logout(); // auto logout on error (e.g. token expired)
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
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
