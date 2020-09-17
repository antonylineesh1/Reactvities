import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layouts/LoadingComponent";
import ActivityStore from '../../../app/store/activityStore';

interface IDetailParams
{
  id:string;
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailParams>> = ({match,history}) => {
  

  const activityStore=useContext(ActivityStore)

  const { activity,submitting,loadActivity,loadingInitial } =activityStore;

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
          <Button basic color="blue" content="Edit" loading={submitting} as={Link} to={`/manage/${activity!.id}`}/>
          <Button basic color="grey" content="Cancel" onClick={()=>history.push('/activities')}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);