import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import AttritionData from "../dashboard/AttritionData";
import { ToastContainer, toast } from 'react-toastify';

const AttritionForm = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [formData, setFormData] = useState({
    Age: "",
    DailyRate: "",
    Department: "",
    BusinessTravel: "",
    DistanceFromHome: "",
    Education: "",
    EducationField: "",
    EnvironmentSatisfaction: "",
    Gender: "",
    HourlyRate: "",
    JobInvolvement: "",
    JobLevel: "",
    JobRole: "",
    JobSatisfaction: "",
    MaritalStatus: "",
    MonthlyIncome: "",
    NumCompaniesWorked: "",
    OverTime: "",
    PerformanceRating: "",
    RelationshipSatisfaction: "",
    StockOptionLevel: "",
    TotalWorkingYears: "",
    TrainingTimesLastYear: "",
    WorkLifeBalance: "",
    YearsAtCompany: "",
    YearsInCurrentRole: "",
    YearsSinceLastPromotion: "",
    YearsWithCurrManager: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(formData);
      const response = await fetch("http://127.0.0.1:5328/recruiter/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      // Parse the JSON response
      const data = await response.json();
      toast.success("Attrition Result are predicted Succesfully");
      setPredictionData(data.prediction);
      setAdditionalInfo(data.additional_info);
      console.log(data.prediction);
      console.log(data.additional_info);

      const prediction = data.prediction;
      const predictionText = data.prediction_text;

      console.log("Prediction:", prediction);
      console.log("Prediction Text:", predictionText);
    } catch (error) {
      console.error("Error fetching prediction:", error.message);
      toast.error("Failed to fetch prediction. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BaseCard title="Employee Attrition Prediction Form">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    name="Age"
                    label="Age"
                    type="number"
                    variant="outlined"
                    placeholder="18-80"
                    required
                    style={{ width: "100%" }}
                    value={formData.Age}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Second item */}
                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="business-travel-label">
                      Business Travel
                    </InputLabel>
                    <Select
                      labelId="business-travel-label"
                      id="business-travel-select"
                      value={formData.BusinessTravel}
                      onChange={handleInputChange}
                      label="Business Travel"
                      name="BusinessTravel"
                    >
                      <MenuItem value="Rarely">Rarely</MenuItem>
                      <MenuItem value="Frequently">Frequently</MenuItem>
                      <MenuItem value="NoTravel">No Travel</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="DailyRate"
                    label="Daily Rate"
                    type="number"
                    variant="outlined"
                    placeholder="100-1600"
                    required
                    inputProps={{ min: 100, max: 1600 }}
                    style={{ width: "100%" }} // Adjust the width value as needed
                    value={formData["DailyRate"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="DistanceFromHome"
                    label="Distance From Home"
                    type="number"
                    variant="outlined"
                    placeholder="1-29"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 29 }}
                    value={formData["DistanceFromHome"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department-select"
                      value={formData.Department}
                      onChange={handleInputChange}
                      label="Department"
                      name="Department"
                    >
                      <MenuItem value="Research & Development">
                        Research & Development
                      </MenuItem>
                      <MenuItem value="HumanResources">
                        Human Resources
                      </MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="Education"
                    label="Education"
                    type="number"
                    variant="outlined"
                    placeholder="1-5"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 5 }}
                    value={formData.Education}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="education-field-label">
                      Education Field
                    </InputLabel>
                    <Select
                      labelId="education-field-label"
                      id="education-field-select"
                      value={formData["EducationField"]}
                      onChange={handleInputChange}
                      label="Education Field"
                      name="EducationField"
                    >
                      <MenuItem value="LifeSciences">Life Sciences</MenuItem>
                      <MenuItem value="Medical">Medical</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="TechnicalDegree">
                        Technical Degree
                      </MenuItem>
                      <MenuItem value="HumanResources">
                        Human Resources
                      </MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="EnvironmentSatisfaction"
                    label="Environment Satisfaction"
                    type="number"
                    variant="outlined"
                    placeholder="1-4"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 4 }}
                    value={formData["EnvironmentSatisfaction"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="HourlyRate"
                    label="Hourly Rate"
                    type="number"
                    variant="outlined"
                    placeholder="30-100"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 30, max: 100 }}
                    value={formData["HourlyRate"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="JobInvolvement"
                    label="Job Involvement"
                    type="number"
                    variant="outlined"
                    placeholder="1-4"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 4 }}
                    value={formData["JobInvolvement"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="JobLevel"
                    label="Job Level"
                    type="number"
                    variant="outlined"
                    placeholder="1-5"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 5 }}
                    value={formData["JobLevel"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="job-role-label">Job Role</InputLabel>
                    <Select
                      labelId="job-role-label"
                      id="job-role-select"
                      value={formData["JobRole"]}
                      onChange={handleInputChange}
                      label="Job Role"
                      name="JobRole"
                    >
                      <MenuItem value="SalesExecutives">
                        Sales Executives
                      </MenuItem>
                      <MenuItem value="ResearchScientist">
                        Research Scientist
                      </MenuItem>
                      <MenuItem value="LaboratoryTechnician">
                        Laboratory Technician
                      </MenuItem>
                      <MenuItem value="ManufacturingDirector">
                        Manufacturing Director
                      </MenuItem>
                      <MenuItem value="HealthcareRepresentative">
                        Healthcare Representative
                      </MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="SalesRepresentative">
                        Sales Representative
                      </MenuItem>
                      <MenuItem value="ResearchDirector">
                        Research Director
                      </MenuItem>
                      <MenuItem value="HumanResources">
                        Human Resources
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="JobSatisfaction"
                    label="Job Satisfaction"
                    type="number"
                    variant="outlined"
                    placeholder="1-4"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 4 }}
                    value={formData["JobSatisfaction"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel component="legend">Marital Status</FormLabel>
                  <RadioGroup
                    aria-label="Marital Status"
                    name="MaritalStatus"
                    value={formData["MaritalStatus"]}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="Married"
                      control={<Radio />}
                      label="Married"
                    />
                    <FormControlLabel
                      value="Single"
                      control={<Radio />}
                      label="Single"
                    />
                    <FormControlLabel
                      value="Divorced"
                      control={<Radio />}
                      label="Divorced"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="MonthlyIncome"
                    label="Monthly Income"
                    type="number"
                    variant="outlined"
                    placeholder="1000-20000"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1000, max: 20000 }}
                    size="30"
                    value={formData["MonthlyIncome"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="NumCompaniesWorked"
                    label="Number of Companies Worked in"
                    type="number"
                    variant="outlined"
                    placeholder="0-9"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 0, max: 9 }}
                    value={formData["NumCompaniesWorked"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel component="legend">Over Time</FormLabel>
                  <RadioGroup
                    aria-label="OverTime"
                    name="OverTime"
                    value={formData["OverTime"]}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="PerformanceRating"
                    label="Performance Rating"
                    type="number"
                    variant="outlined"
                    placeholder="1-4"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 4 }}
                    value={formData["PerformanceRating"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="RelationshipSatisfaction"
                    label="Relationship Satisfaction"
                    type="number"
                    variant="outlined"
                    placeholder="1-4"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 4 }}
                    value={formData["RelationshipSatisfaction"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="StockOptionLevel"
                    label="Stock Option Level"
                    type="number"
                    variant="outlined"
                    placeholder="0-3"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 0, max: 3 }}
                    value={formData["StockOptionLevel"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="TotalWorkingYears"
                    label="Total Working Years"
                    type="number"
                    variant="outlined"
                    placeholder="0-40"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 0, max: 40 }}
                    value={formData["TotalWorkingYears"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="TrainingTimesLastYear"
                    label="Training Times Last Year"
                    type="number"
                    variant="outlined"
                    placeholder="0-6"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 0, max: 6 }}
                    value={formData["TrainingTimesLastYear"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="WorkLifeBalance"
                    label="Work Life Balance"
                    type="number"
                    variant="outlined"
                    placeholder="1-4"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 1, max: 4 }}
                    value={formData["WorkLifeBalance"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="YearsAtCompany"
                    label="Years At Company"
                    type="number"
                    variant="outlined"
                    placeholder="0-40"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 0, max: 40 }}
                    value={formData["YearsAtCompany"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="YearsInCurrentRole"
                    label="Years In Current Role"
                    type="number"
                    variant="outlined"
                    placeholder="0-18"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 0, max: 18 }}
                    value={formData["YearsInCurrentRole"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="YearsSinceLastPromotion"
                    label="Years Since Last Promotion"
                    type="number"
                    variant="outlined"
                    placeholder="0-15"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 0, max: 15 }}
                    value={formData["YearsSinceLastPromotion"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="YearsWithCurrManager"
                    label="Years With Current Manager"
                    type="number"
                    variant="outlined"
                    placeholder="0-17"
                    required
                    style={{ width: "100%" }}
                    inputProps={{ min: 0, max: 17 }}
                    value={formData["YearsWithCurrManager"]}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Predict
                  </Button>
                </Grid>
              </Grid>
            </form>
          </BaseCard>
        </Grid>
        <Grid item xs={12}>
          <BaseCard title="Employee Attrition Prediction Result">
            {/* Render PredictionTable component if prediction data is available */}
            <AttritionData
              predictionData={predictionData}
              additionalInfo={additionalInfo}
            />
          </BaseCard>
        </Grid>
      </Grid>
    </>
  );
};

export default AttritionForm;
