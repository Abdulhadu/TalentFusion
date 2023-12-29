"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/Authcontext";

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page if not authenticated
    if (authenticated == false) {
      router.push("/Services/recruiter/c_signin");
    }
    console.log("Aythentication value",authenticated )
  }, [authenticated, router]);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  // Render children only if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
