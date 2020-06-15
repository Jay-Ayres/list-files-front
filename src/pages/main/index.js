import React, { Component } from "react";
import { FaFolder, FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import api from "../../services/api";
import { Container, Form, SubmitButton, List } from "./styles";

export default class Main extends Component {
  state = {
    newPath: "",
    repositories: [],
    totalFiles: "",
    totalSize: ""
  };

  handleInputChange = e => {
    this.setState({ newPath: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newPath, repositories } = this.state;

    const response = await api.post("", {
      path: newPath
    });

    this.setState({
      repositories: response.data.files,
      totalFiles: response.data.totalFiles,
      totalSize: response.data.totalSize,
      newPath: ""
    });
  };

  render() {
    const { newPath, repositories, totalFiles, totalSize } = this.state;
    return (
      <Container>
        <h1>
          <FaFolder />
          Files
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add path"
            value={newPath}
            onChange={this.handleInputChange}
          />

          <SubmitButton disable>
            <FaSearch color="#FFF" size={14} />
          </SubmitButton>
        </Form>
        <div>
          <h2>
            Total Files: {totalFiles} Total Size:{totalSize}
          </h2>
        </div>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <div>
                <span>Name: {repository.name}</span>
                <br />
                Size: {repository.fsize + " - "}
                <span>
                  Last Modification:
                  {format(new Date(repository.mtime), "yyyy-MM-dd HH:mm:ss")}
                </span>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
