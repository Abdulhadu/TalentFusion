import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Link,
  Grid,
  Box,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const JobListing = ({ jobData }) => {
  return (
    <Grid container spacing={2}>
      {jobData.map((job, index) => (
        <Grid item xs={12} lg={12} key={index}>
          <Card className="job-card">
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
              >
                <Box>
                  <Box display="flex" alignItems="center">
                    <BusinessIcon fontSize="medium" color="secondary" />
                    <Typography variant="h2" component="div" ml={1}>
                      <Link
                        href={job.url}
                        color="textPrimary"
                        target="_blank"
                        underline="hover"
                      >
                        {job.Position}
                      </Link>
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    <LocationOnIcon fontSize="small" color="action" />{" "}
                    {job.Company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Position: {job.Location}
                  </Typography>
                </Box>

                <Box mt={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<OpenInNewIcon />}
                    mt={3}
                  >
                    <Link
                      href={job.url}
                      color="white"
                      target="_blank"
                      underline="none"
                    >
                      View Job
                    </Link>
                  </Button>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  mt={1}
                >
                  <IconButton color="error">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <ThumbUpIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobListing;
