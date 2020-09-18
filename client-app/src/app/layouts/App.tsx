import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Nav } from "../../features/nav/Nav";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities" />;
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />

      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Nav />
            <Container style={{ marginTop: "7em" }}>
              <Route path="/activities" component={ActivityDashboard} />
              <Route exact path="/activity/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                exact
                path={["/createForm", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
