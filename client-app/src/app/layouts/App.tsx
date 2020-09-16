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
  
  const handleSelectActivity=(id:string)=>{
    setSelectedActivity(activities.filter(a=>a.id===id)[0])
  }

  const openCreateForm=()=>{
    setEditMode(true);
    setSelectedActivity(null);    
  }
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <Nav openCreateForm={openCreateForm}/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard activities={activities} selectActivity={handleSelectActivity}
         selectedActivity={selectedActivity} editMode={editMode} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity}/>
      </Container>
    </Fragment>
  );
};

export default App;
