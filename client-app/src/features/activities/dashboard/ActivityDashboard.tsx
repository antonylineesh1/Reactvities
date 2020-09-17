import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import  ActivityDetails from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import  ActivityList  from "./ActivityList";
import ActivityStore from "../../../app/store/activityStore";



const ActivityDashboard: React.FC = () => {

  const activityStore=useContext(ActivityStore);

  const { editMode,activity }=activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h1>Activity filters</h1>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);