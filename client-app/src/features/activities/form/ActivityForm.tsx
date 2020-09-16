import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity'

interface IProps
{
    setEditMode:(editMode:boolean)=>void;
    selectedActivity :IActivity|null;
}
export const ActivityForm :React.FC<IProps>= ({setEditMode,selectedActivity:intializeFormState}) => {

    const initializeForm=()=>{

        if(intializeFormState)
        {
            return intializeFormState;
        }
        else{
            return {
                id:'',
                title:'',
                description:'',
                category:'',
                date:'',
                city:'',
                venue:''
            }
        }
    }
    const [activity,setActivity]=useState<IActivity>(initializeForm);
    
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activity.title}/>
                <Form.TextArea rows={2} placeholder='Description' value={activity.description}/>
                <Form.Input placeholder='Category' value={activity.category}/>
                <Form.Input type='Date' placeholder='Date' value={activity.date}/>
                <Form.Input placeholder='City' value={activity.city}/>
                <Form.Input placeholder='Venue' value={activity.venue}/>        
                <Button positive floated='right' type='submit' content='Submit'/>
                <Button floated='right' type='button' content='Cancel' onClick={()=>setEditMode(false)}/>
            </Form>
        </Segment>
    )
}
