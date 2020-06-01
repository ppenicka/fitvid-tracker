import React from 'react';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import WorkoutPlanBox from '../WorkoutPlanBox/WorkoutPlanBox';
import './WorkoutPlanList.css';


const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121"
    },
  },
});

const WorkoutPlanList = ({ plans }) => {

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
        <div className="workout-list-box">
          {plans.map((plan) => (
            <WorkoutPlanBox plan={plan} />
          ))}
        </div>
    </ThemeProvider>
  );
};

export default WorkoutPlanList;
