import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";
import ActivityStore from "../../../app/store/activityStore";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const activityStore = useContext(ActivityStore);
  const { submitting, target, deleteActivity } = activityStore;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item key={activity.id}>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Hosted by Antony</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {activity.date}
        <Icon name="marker" />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated="right"
          content="View"
          color="blue"
          as={NavLink}
          to={`/activity/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};
