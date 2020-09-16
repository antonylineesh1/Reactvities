import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";
import  ActivityStore  from "../../../app/store/activityStore";

interface ISomeAnotherInterFace {
  deleteActivity: (event:SyntheticEvent<HTMLButtonElement>,activity: IActivity) => void;
  submitting:boolean;
  target:string;
}
const ActivityList: React.FC<ISomeAnotherInterFace> = ({
  deleteActivity,
  submitting,
  target
}) => {

  const activityStore=useContext(ActivityStore);
  const { selectActivity,activitiesByDate }=activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
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