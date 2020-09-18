import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";
import ActivityStore from "../../../app/store/activityStore";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity,
}) => 

{
  const activityStore = useContext(ActivityStore);
  const { submitting, target, deleteActivity } = activityStore;

  return (
    <Item key={activity.id}>
      <Item.Content>
        <Item.Header as="a">{activity.title}</Item.Header>
        <Item.Meta>{activity.date}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>
            {activity.city},{activity.venue}
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            name={activity.id}
            loading={target === activity.id && submitting}
            floated="right"
            content="Delete"
            color="red"
            onClick={(event) => deleteActivity(event, activity)}
          />
          <Button
            floated="right"
            content="View"
            color="blue"
            as={NavLink}
            to={`/activity/${activity.id}`}
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
