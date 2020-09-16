import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

interface IProps {
  activities: IActivity[];
  selectActivity:(id:string)=>void,
  selectedActivity:IActivity|null,
  editMode:boolean,
  setEditMode:(editMode:boolean)=>void,
  setSelectedActivity:(activity:IActivity|null)=>void
}
export const ActivityDashboard: React.FC<IProps> = ({ activities,selectActivity,selectedActivity,editMode,setEditMode,setSelectedActivity }) => 
{
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity}/>
      </Grid.Column>
      <Grid.Column width={6}>
        { !editMode && selectedActivity && <ActivityDetails setEditMode={setEditMode} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity}/>}
        { editMode && <ActivityForm setEditMode={setEditMode} selectedActivity={selectedActivity}/>}
      </Grid.Column>
    </Grid>
  );
};
