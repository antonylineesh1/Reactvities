import { action, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/IActivity";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable selectedActivity: IActivity | undefined;

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((actv) => actv.id === id);
    this.editMode = false;
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try 
    {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        this.activities.push(activity);
      });
      this.loadingInitial = false;
    }
    catch (error) 
    {
      console.log(error);
      this.loadingInitial = false;
    }
    
  };
}

export default createContext(new ActivityStore());
