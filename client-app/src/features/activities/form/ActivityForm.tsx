import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";
import { v4 as uuid } from "uuid";
import activityStore from "../../../app/store/activityStore";
import { RouteComponentProps } from "react-router";

interface IDetailsParams {
  id: string;
}

export const ActivityForm: React.FC<RouteComponentProps<IDetailsParams>> = ({
  match,
  history
}) => {
  const store = useContext(activityStore);
  const {
    createActivity,
    submitting,
    editActivity,
    activity: intializeFormState,
    loadActivity,
    clearActivity
  } = store;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });


  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        intializeFormState && setActivity(intializeFormState);
      });

      return (()=>{
        clearActivity();
      })
    }
  },[loadActivity,match.params.id,intializeFormState,activity.id.length,clearActivity]);




  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(()=>
      {
        history.push(`/activity/${newActivity.id}`);
      });
    } else 
    {
      editActivity(activity);
      history.push(`/activity/${activity.id}`);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
          value={activity.title}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
          value={activity.description}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          onChange={handleInputChange}
          value={activity.category}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          name="date"
          onChange={handleInputChange}
          value={activity.date}
        />
        <Form.Input
          placeholder="City"
          name="city"
          onChange={handleInputChange}
          value={activity.city}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          onChange={handleInputChange}
          value={activity.venue}
        />
        <Button
          loading={submitting}
          positive
          floated="right"
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={()=>{history.push('/activities')}}
        />
      </Form>
    </Segment>
  );
};
