import { action, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/IActivity";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable selectedActivity: IActivity | undefined;
  @observable submitting=false;

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

  @action createActivity= async (activity:IActivity)=>{
    this.submitting=true;
    try {
        
        await agent.Activities.create(activity);
        this.activities.push(activity);
        this.selectedActivity=activity;
        this.editMode=false;
        this.submitting=false; 

    } catch (error) {
        console.log(error);
        this.editMode=false;
        this.submitting=false; 

    }
  }
  @action openCreateForm= ()=>{
    this.editMode=true;
    this.selectedActivity=undefined;
    
  }
}

export default createContext(new ActivityStore());
