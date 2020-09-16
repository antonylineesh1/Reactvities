import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/IActivity";
import { Nav } from "../../features/nav/Nav";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let formattedActivities: IActivity[] = [];

      response.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        formattedActivities.push(activity);
      });
      setActivities(formattedActivities);
    });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const openCreateForm = () => {
    setEditMode(true);
    setSelectedActivity(null);
  };

  const handleCreateActivity = (activity: IActivity) => {
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };
  const handlerEditActivity = (activity: IActivity) => {
    agent.Activities.update(activity.id, activity).then(() => {
      setActivities([
        ...activities.filter((actv) => actv.id !== activity.id),
        activity,
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (activity: IActivity) => {
    agent.Activities.delete(activity.id).then(() => {
      setActivities([...activities.filter((act) => act.id !== activity.id)]);
    });
  };

  return (
    <Fragment>
      <Nav openCreateForm={openCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handlerEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
