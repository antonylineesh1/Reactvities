import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Nav } from "../../features/nav/Nav";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities" />;
  return (
    <Fragment>
      <Nav />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route  path="/activities" component={ActivityDashboard} />
        <Route  path="/activity/:id" component={ActivityDetails} />
        <Route exact path="/createForm" component={ActivityForm} />
      </Container>
    </Fragment>
  );
};

export default observer(App);
