import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layouts/LoadingComponent";
import ActivityStore from "../../../app/store/activityStore";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";

interface IDetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);

  const { activity, submitting, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="Activity Details Loading....." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
