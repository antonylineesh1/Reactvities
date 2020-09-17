import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";
import  ActivityDetails from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import  ActivityList  from "./ActivityList";
import ActivityStore from "../../../app/store/activityStore";

interface IProps {
  deleteActivity:(event:SyntheticEvent<HTMLButtonElement>,activity:IActivity)=>void;
  submitting:boolean;
  target:string;
  setEditMode:(editMode:boolean)=>void;
}

const ActivityDashboard: React.FC<IProps> = 
({
  deleteActivity,
  submitting,
  target
}) => {

  const activityStore=useContext(ActivityStore);

  const { editMode,selectedActivity }=activityStore;

  debugger;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList deleteActivity={deleteActivity} submitting={submitting} target={target} />
      </Grid.Column>
      <Grid.Column width={6}>
        
        {!editMode && selectedActivity && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            selectedActivity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);