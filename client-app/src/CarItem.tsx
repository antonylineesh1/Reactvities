import React from 'react'
import { ICar } from './demo'

interface ITestProps
{
    car :ICar
}
export const CarItem:React.FC<ITestProps> = ({car}) => {
    return (
        <div>
            {car.color}
        </div>
    )
}
