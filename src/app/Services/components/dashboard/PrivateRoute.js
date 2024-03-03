"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/Authcontext";

const PrivateRoute = ({ children, userType }) => {
  const { recruiterAuthenticated, interviewerAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    console.log("recruiterauthenticate: ", recruiterAuthenticated);
    console.log("interviewauthenticate: ", interviewerAuthenticated);

    // Wait for 2 seconds before checking conditions
    const timeoutId = setTimeout(() => {
      if (userType === "recruiter" && !recruiterAuthenticated) {
        router.push("/Services/recruiter/c_signin");
      } else if (userType === "interviewer" && !interviewerAuthenticated) {
        router.push("/Interview/login");
      }
    }, 2000); // Adjust the time according to your needs

    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
  }, [recruiterAuthenticated, interviewerAuthenticated, router, userType]);

  if (userType === "recruiter" && recruiterAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (userType === "interviewer" && interviewerAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Render children only if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
