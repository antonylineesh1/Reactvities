let data=10;

export interface ICar
{
    color:string,
    model:string,
    topSpeed?:number
}

const car1:ICar=
{
    color:'black',
    model:'BMW',
    topSpeed:150
}

const car2:ICar={
    color:'red',
    model:'Mercedes'    
}

const multiply=(x:number,y:number)=>
{
    let z=x*y;
	
}


export const cars=[car1,car2];