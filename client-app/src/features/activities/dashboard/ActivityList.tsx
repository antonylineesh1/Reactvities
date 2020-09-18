import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import  ActivityStore  from "../../../app/store/activityStore";
import { ActivityListItem } from "./ActivityListItem";

const ActivityList: React.FC = () => {

  const activityStore=useContext(ActivityStore);
  const { activitiesByDate,submitting,target,deleteActivity }=activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <ActivityListItem activity={activity}/>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default  observer(ActivityList);