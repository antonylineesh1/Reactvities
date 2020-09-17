import React, {
  Fragment,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/IActivity";
import { Nav } from "../../features/nav/Nav";
import  ActivityDashboard  from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);




  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    activity: IActivity
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(activity.id)
      .then(() => {
        setActivities([...activities.filter((act) => act.id !== activity.id)]);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading activities" />;
  return (
    <Fragment>
      <Nav />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          setEditMode={setEditMode}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
