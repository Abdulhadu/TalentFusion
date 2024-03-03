// CoursesRecomendation.js
import React from "react";
import BaseCard from "../shared/DashboardCard";
import {
  Stack,
  Button,
  Grid,
  Chip
} from "@mui/material";
import Typography from "@mui/material/Typography";

const CoursesRecomendation = ({ data }) => {
  return (
    <BaseCard
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          Recommended Courses
        </div>
      }
    >
      <Grid container spacing={2}>
        {data.rec_course.map((course, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="body1" gutterBottom style={{ flexGrow: 1 }}>
              {course}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Chip
                label="Web Development"
                color="primary"
                style={{ marginRight: "8px" }}
              />

              <Button
                variant="contained"
                color="primary"
                href="your_course_link_here"
                target="_blank"
              >
                Learn More
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </BaseCard>
  );
};

export default CoursesRecomendation;
