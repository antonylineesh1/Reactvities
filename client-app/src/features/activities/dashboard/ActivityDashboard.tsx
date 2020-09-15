import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";

interface IProps {
  activities: IActivity[];
}
export const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <List>
          {activities.map((value) => (
            <List.Item key={value.id}>{value.title}</List.Item>
          ))}
        </List>
      </Grid.Column>
    </Grid>
  );
};
