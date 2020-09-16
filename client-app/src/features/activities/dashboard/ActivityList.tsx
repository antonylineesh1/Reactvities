import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";

interface ISomeAnotherInterFace {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (event:SyntheticEvent<HTMLButtonElement>,activity: IActivity) => void;
  submitting:boolean;
  target:string;
}
export const ActivityList: React.FC<ISomeAnotherInterFace> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => (
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
                  loading={ target===activity.id && submitting}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={(event) => deleteActivity(event,activity)}
                />
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => selectActivity(activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default  observer(ActivityList);