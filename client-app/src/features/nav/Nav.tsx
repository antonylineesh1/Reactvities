import React, { useContext } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import ActivityStore from "../../app/store/activityStore";


export const Nav:React.FC = () => {

  const activityStore=useContext(ActivityStore);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item name="home" header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
            Reactivities    
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
            <Button positive content="Create Activity" onClick={()=> activityStore.openCreateForm()}/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
