import React, {
  Fragment,
  useContext,
  useEffect,
} from "react";
import { Container } from "semantic-ui-react";
import { Nav } from "../../features/nav/Nav";
import  ActivityDashboard  from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);


  if (activityStore.loadingInitial) return <LoadingComponent content="Loading activities" />;
  return (
    <Fragment>
      <Nav />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
