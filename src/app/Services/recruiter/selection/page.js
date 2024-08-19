'use client';
import { Grid, Paper } from "@mui/material";
import BaseCard from '@/app/Services/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import MonthlyEarnings from "@/app/Services/components/dashboard/MonthlyEarnings";
<<<<<<< HEAD
import PrivateRoute from "../../components/dashboard/PrivateRoute";
=======

>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });




const Tables = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <MonthlyEarnings />
      </Grid>
    </Grid>
  );
};

export default Tables;