import React, { Component } from "react";
import logo from "./logo.svg";
import { CarItem } from "../../CarItem";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/IActivity";

interface IState {
  activities: IActivity[];
}

class App extends Component {
  readonly state: IState = {
    activities: [],
  };

  componentDidMount() 
  {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
      this.setState({ activities: response.data });
    });

  }
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="plug" />
          <Header.Content>reactivities</Header.Content>
        </Header>
        <List>
          {this.state.activities.map((value) => (
            <List.Item key={value.id}>{value.title}</List.Item>
          ))}
        </List>

        <ul></ul>
      </div>
    );
  }
}

export default App;
