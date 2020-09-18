import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export const HomePage = () => {
    return (
        <Container style={{marginTop:'10px'}}>
            <h1>This is home page</h1>
            <h3>Go to <NavLink to='/activities'>actitivities</NavLink></h3> 
        </Container>
    )
}
