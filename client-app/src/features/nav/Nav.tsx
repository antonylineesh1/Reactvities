import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import ActivityStore from "../../app/store/activityStore";


export const Nav:React.FC = () => {

  const activityStore=useContext(ActivityStore);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item name="home" header as={NavLink} exact to="/">
            <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
            Reactivities    
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
            <Button positive content="Create Activity" as={NavLink} to="/createForm"/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
