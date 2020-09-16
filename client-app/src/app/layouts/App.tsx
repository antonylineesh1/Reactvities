import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/IActivity";
import { Nav } from "../../features/nav/Nav";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<IActivity|null>(null);
  const [editMode,setEditMode]=useState(false);


  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {

        let formattedActivities:IActivity[]=[];

        response.data.forEach(activity=>{
          activity.date=activity.date.split('.')[0];
          formattedActivities.push(activity);          
        })
        setActivities(formattedActivities);
      });
  }, []);


  const handleSelectActivity=(id:string)=>{
    setSelectedActivity(activities.filter(a=>a.id===id)[0]);
    setEditMode(false);
  }

  const openCreateForm=()=>{
    setEditMode(true);
    setSelectedActivity(null);    
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities,activity]);
    setSelectedActivity(activity);
    setEditMode(false);

  };
  const handlerEditActivity=(activity:IActivity) => {
    setActivities([...activities.filter(actv=>actv.id !== activity.id),activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  return (
    <Fragment>
      <Nav openCreateForm={openCreateForm}/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard activities={activities} selectActivity={handleSelectActivity}
         selectedActivity={selectedActivity} editMode={editMode} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity}
         createActivity={handleCreateActivity}
         editActivity={handlerEditActivity}
         />
      </Container>
    </Fragment>
  );
};

export default App;
