import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
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
    <div>
      <Nav/>
      <List>
        {activities.map((value) => (
          <List.Item key={value.id}>{value.title}</List.Item>
        ))}
      </List>

      <ul></ul>
    </div>
  );
};

export default App;
