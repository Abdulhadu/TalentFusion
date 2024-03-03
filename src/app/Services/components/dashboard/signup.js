"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { baselightTheme } from "../../../../utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider, useAuth } from "../../context/Authcontext";

const Signup = () => {
  const router = useRouter();
  const { login, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Send form data to the "/recruiter/signin" API endpoint
      const response = await fetch("http://127.0.0.1:5328/recruiter/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log("token is :", token);

        // Set the token in the cookie
        login(token);

        console.log("Login Successful");
        router.push("/Interview/Personality");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={baselightTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 8,
            py: 5,
            backgroundColor: "white",
            boxShadow: 15,
            borderRadius: 5,
          }}
        >
          <Box sx={{ px: 5, py: 5 }}>
            <Box sx={{ width: 450, height: "auto" }}>
              <img
                src="/images/profile/user-1.jpg"
                alt="Your Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 0,
                  borderRadius: 15,
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 3,
              py: 3,
            }}
          >
            <img
              src="/images/logos/telent-fussion-logo.png"
              alt="Your Avatar"
              style={{
                width: 200,
                height: "auto",
                marginTop: 15,
                marginBottom: 15,
              }}
            />
            <Typography component="h1" variant="h2" sx={{ mt: 3 }}>
              Welcome User For Interview
            </Typography>
            <Typography
              sx={{ color: "grey", textAlign: "center" }}
              variant="caption"
              display="block"
            >
              Sign in with your valid details that are sent to your Email
              Address.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                style={{
                  borderRadius: 35,
                  backgroundColor: "#21b6ae",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
                type="submit" // Use type="submit" here
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign IN
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Don't have an Account? Contact Admin to Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
