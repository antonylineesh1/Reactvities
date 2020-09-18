import { action, computed, observable,configure,runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/IActivity";

configure({enforceActions:'always'});

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity: IActivity | undefined | null;
  @observable submitting=false;
  @observable activityRegistry=new Map();
  @observable target='';

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try 
    {
      const activities = await agent.Activities.list();

      runInAction('loading activities',()=>{

      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        this.activityRegistry.set(activity.id,activity);
        });
        this.loadingInitial = false;
      })

    }
    catch (error) 
    {
      console.log(error);
      runInAction('loading activities error',()=>{
        this.loadingInitial = false;
      })

    }
  };

  @action createActivity= async (activity:IActivity)=>{
    this.submitting=true;
    try {
        
        await agent.Activities.create(activity);

        runInAction('creating activity',()=>{
          this.activityRegistry.set(activity.id,activity);
          this.activity=activity;
          this.submitting=false; 
        });


    } catch (error) {
        console.log(error);
        runInAction('creating activity error',()=>{
          this.submitting=false; 
        })


    }
  }

  @action editActivity=async (activity:IActivity)=>{
    this.submitting=true;
    try {

      await agent.Activities.update(activity.id, activity);
      runInAction('edit actitivy',()=>{
        this.activityRegistry.set(activity.id,activity);
        this.activity=activity;                
        this.submitting=false;
      });


    } catch (error) {
      runInAction('edit activity error',()=>{
        console.log(error);      
        this.submitting=false;
      });

    }
  }




  @action deleteActivity= async ( event: SyntheticEvent<HTMLButtonElement>,activity: IActivity)=>
  {
      this.submitting=true;
      try {

        this.target=event.currentTarget.name;      
        await agent.Activities.delete(activity.id);      

        runInAction(()=>{
          this.target='';
          this.activityRegistry.delete(activity.id);
          this.submitting=false;
        });


      } catch (error) 
      {        
        console.log(error);
        runInAction(()=>{
          this.target='';
          this.submitting=false;
        });
      }
  }

  @action loadActivity= async ( id:string ) => {
    
    let activity=this.getActivity(id);

    if(activity)
    {
        this.activity=activity;
    }
    else
    {
      this.loadingInitial=true;
      try 
      {

        activity=await agent.Activities.details(id);
        runInAction('load activity',()=>{
          this.activity=activity;
          this.loadingInitial=false;
        })

      } catch (error) {
        runInAction('load activity error',()=>{
          this.loadingInitial=false;
          console.log(error);
        })
      }
    }
  }

  @action clearActivity=()=>{
    this.activity=null;
  }

  getActivity=(id:string)=>{

    return this.activityRegistry.get(id);
  }

  @computed get activitiesByDate()
  {
        return Array.from(this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
  }

}

export default createContext(new ActivityStore());
