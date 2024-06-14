// PhraseComponent.js
import React from 'react';
import { call } from './service/ApiService';
import { Paper, Typography } from '@material-ui/core';

class PhraseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
    };
  }

  componentDidMount() {
    this.fetchPhrase();
  }

  fetchPhrase = () => {
    console.log("fetchPhrase 실행")
    call("/phrase/get", "GET", null).then((response) => {
      this.setState({ phrase: response});
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Typography variant="h6">
          {this.state.phrase.toString()}
        </Typography>
      </Paper>
    );
  }
}

export default PhraseComponent;
