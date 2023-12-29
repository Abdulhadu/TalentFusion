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

const Signup = () => {
  const router = useRouter()
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
        router.push("/Interview/Personality")
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={baselightTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          mb: 8,
        }}
      >
        <CssBaseline />

        <Box
          noValidate
          encType="application/json"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 15,
            px: 5,
            py: 3,
            borderRadius: 5,
            backgroundColor: "white",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h3">
            Welcome User For Interview
          </Typography>
          <Typography
            sx={{ color: "grey", textAlign: "center" }}
            variant="caption"
            display="block"
          >
            Sign in with your valid details that are sent to your Email Address.
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
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
