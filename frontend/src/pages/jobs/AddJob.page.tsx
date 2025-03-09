import React, { useState, useEffect } from "react";
import "./Jobs.page";
import {
  ICompany,
  ICreateCompanyDto,
  ICreateJobDto,
} from "../../types/global.typing";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const levelsArray:string[]=[ "Intern", "Junior", "MidLevel", "Senior", "TeamLead", "Cto", "Architect" ]

const AddJob = () => {
  const [jobs, setJobs] = useState<ICreateJobDto>({
    title: "",
    level: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<ICompany[]>("./company/Get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (jobs.title === "" || 
      jobs.level === "" ||
      jobs.companyId === "") {
      alert("Please fill all fields");
      return;
    }
    httpModule
      .post("Job/Create", jobs)
      .then((response) => redirect("/jobs"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/jobs");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add New job</h2>
        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={jobs.title}
          onChange={(e) => setJobs({ ...jobs, title: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Job Level</InputLabel>
          <Select
            value={jobs.level}
            label="Job Level"
            onChange={(e) => setJobs({ ...jobs, level: e.target.value })}>
  
            { levelsArray.map((item) => (
              <MenuItem key={item} value={item}>
                {item} 
              </MenuItem>))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={jobs.companyId}
            label="company"
            onChange={(e) => setJobs({ ...jobs, companyId: e.target.value })}>
  
            { companies.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name} 
              </MenuItem>))}
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
