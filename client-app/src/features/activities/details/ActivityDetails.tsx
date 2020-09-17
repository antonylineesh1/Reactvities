import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Card, Image, Button } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layouts/LoadingComponent";
import ActivityStore from '../../../app/store/activityStore';

interface IDetailParams
{
  id:string;
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailParams>> = ({match}) => {
  

  const activityStore=useContext(ActivityStore)

  const { activity,openEditForm,cancelSelectedActivity,submitting,loadActivity,loadingInitial } =activityStore;

  useEffect(()=>{
    loadActivity(match.params.id);
  },[loadActivity]);

  if(loadingInitial || !activity) return <LoadingComponent content='Activity Details Loading.....'/>

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Edit" onClick={()=>openEditForm(activity!.id)} loading={submitting} />
          <Button basic color="grey" content="Cancel" onClick={cancelSelectedActivity}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);