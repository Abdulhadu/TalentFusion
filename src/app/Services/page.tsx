'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/Services/components/container/PageContainer';
// components
import SalesOverview from '@/app/Services/components/dashboard/SalesOverview';
import DailyActivity from '@/app/Services/components/dashboard/Recomendation';
import ProductPerformance from '@/app/Services/components/dashboard/UserOverview';
import React from 'react';

const Dashboard = () => {
  return (
    <>
      <PageContainer title="Dashboard" description="this is Dashboard">
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <SalesOverview />
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={4}>
              {/* <DailyActivity /> */}
            </Grid>
            <Grid item xs={12} lg={8}>
              {/* <ProductPerformance /> */}
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
      </>
<<<<<<< HEAD
=======
   
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
  )
}

export default Dashboard;
