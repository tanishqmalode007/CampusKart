import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function ProtectedRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setChecking(false);
        return;
      }

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      setProfileComplete(docSnap.exists());

      setChecking(false);
    };

    checkProfile();
  }, [user]);

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message: "Please login to continue.",
        }}
      />
    );
  }

  if (checking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!profileComplete && location.pathname !== "/complete-profile") {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
}

export default ProtectedRoute;