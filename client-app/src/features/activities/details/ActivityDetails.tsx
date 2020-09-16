import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";
import ActivityStore from '../../../app/store/activityStore';

interface IProps 
{
  setEditMode:(editMode:boolean)=>void;
  setSelectedActivity:(activity:IActivity|null)=>void;
  submitting:boolean;
}

const ActivityDetails: React.FC<IProps> = ({ setEditMode,setSelectedActivity,submitting }) => {
  
  const activityStore=useContext(ActivityStore)

  const { selectedActivity } =activityStore;
  debugger;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity!.title}</Card.Header>
        <Card.Meta>
          <span className="date">{selectedActivity!.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Edit" onClick={()=>setEditMode(true)} loading={submitting} />
          <Button basic color="grey" content="Cancel" onClick={()=>setSelectedActivity(null)}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);