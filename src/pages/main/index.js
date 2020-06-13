import React, { Component } from "react";
import { FaFolder, FaSearch } from "react-icons/fa";

import api from "../../services/api";
import { Container, Form, SubmitButton, List } from "./styles";

export default class Main extends Component {
  state = {
    newRepo: "",
    repositories: []
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: ""
    });

    console.log(response.data);
  };

  render() {
    const { newRepo, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaFolder />
          Repositorios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton disable>
            <FaSearch color="#FFF" size={14} />
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
