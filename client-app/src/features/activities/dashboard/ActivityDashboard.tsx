import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";
import  ActivityDetails from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import  ActivityList  from "./ActivityList";
import ActivityStore from "../../../app/store/activityStore";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity:(event:SyntheticEvent<HTMLButtonElement>,activity:IActivity)=>void;
  submitting:boolean;
  target:string;
  setEditMode:(editMode:boolean)=>void;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  setSelectedActivity,
  editActivity,
  deleteActivity,
  submitting,
  target,
  setEditMode
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
          <ActivityDetails
            setEditMode={setEditMode!}
            setSelectedActivity={setSelectedActivity}
            submitting={submitting}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            selectedActivity={selectedActivity!}
            setEditMode={setEditMode}
            editActivity={editActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);