import { group } from "console";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/store/activityStore";
import { ActivityListItem } from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
    submitting,
    target,
    deleteActivity,
  } = activityStore;

  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => {
        return (
          <Fragment key={group}>
            <Label size="large" color="blue">
              {group}
            </Label>
              <Item.Group divided>
                {activities.map((activity) => (
                  <ActivityListItem key={activity.id} activity={activity} />
                ))}
              </Item.Group>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default observer(ActivityList);
