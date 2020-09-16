import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity'
import {v4 as uuid} from 'uuid';

interface IProps
{
    setEditMode:(editMode:boolean)=>void;
    selectedActivity :IActivity|null;
    createActivity:(activity:IActivity)=>void;
    editActivity:(activity:IActivity)=>void;
}
export const ActivityForm :React.FC<IProps>= ({setEditMode,selectedActivity:intializeFormState,createActivity,editActivity}) => {

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
    
    const handleInputChange=(event:any)=>{

        const {name,value}=event.target;        
        setActivity({...activity,[name]:value});

    }

    const handleSubmit=()=>
    {
        if(activity.id.length ==0)
        {
            let newActivity={
                ...activity,
                id:uuid()
            }
            createActivity(newActivity);
        }
        else
        {
            editActivity(activity);
        }
        console.log(activity);
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' name='title' onChange={handleInputChange} value={activity.title}/>
                <Form.TextArea rows={2} placeholder='Description' name='description' onChange={handleInputChange} value={activity.description}/>
                <Form.Input placeholder='Category' name='category' onChange={handleInputChange} value={activity.category}/>
                <Form.Input type='Date' placeholder='Date' name='date' onChange={handleInputChange} value={activity.date}/>
                <Form.Input placeholder='City' name='city' onChange={handleInputChange} value={activity.city}/>
                <Form.Input placeholder='Venue' name='venue' onChange={handleInputChange} value={activity.venue}/>        
                <Button positive floated='right' type='submit' content='Submit'/>
                <Button floated='right' type='button' content='Cancel' onClick={()=>setEditMode(false)}/>
            </Form>
        </Segment>
    )
}
