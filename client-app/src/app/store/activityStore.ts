import { action, computed, observable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/IActivity";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable selectedActivity: IActivity | undefined;
  @observable submitting=false;
  @observable activityRegistry=new Map();
  @observable target='';

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try 
    {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id,activity);
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
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id,activity);
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

  @action editActivity=async (activity:IActivity)=>{
    this.submitting=true;
    try {

      await agent.Activities.update(activity.id, activity);
      this.activityRegistry.set(activity.id,activity);
      this.selectedActivity=activity;
      this.editMode=false;            
      this.submitting=false;

    } catch (error) {
      console.log(error);
      this.submitting=false;
    }
  }

  @action openEditForm=(id:string)=>{

    this.selectedActivity=this.activityRegistry.get(id);
    this.editMode=true;
    
  }

  @action cancelSelectedActivity=()=>{

    this.selectedActivity=undefined;
  }

  @action cancelFormOpen=()=>{
    this.editMode=false;
  }

  @action deleteActivity= async ( event: SyntheticEvent<HTMLButtonElement>,activity: IActivity)=>
  {
      this.submitting=true;
      try {

        this.target=event.currentTarget.name;      
        await agent.Activities.delete(activity.id);      
        this.target='';
        this.activityRegistry.delete(activity.id);
        this.submitting=false;

      } catch (error) 
      {        
        console.log(error);
        this.target='';
        this.submitting=false;

      }
  }

  @computed get activitiesByDate()
  {
        return Array.from(this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
  }

}

export default createContext(new ActivityStore());
