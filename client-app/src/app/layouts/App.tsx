import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/IActivity";
import { Nav } from "../../features/nav/Nav";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <Nav/>
      <Container style={{marginTop:'7em'}}>
      <List>
        {activities.map((value) => (
          <List.Item key={value.id}>{value.title}</List.Item>
        ))}
      </List>
      </Container>
    </Fragment>
  );
};

export default App;
