import React from "react";
import { TextField, Paper, Button, Grid, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "" } };
    this.add = props.add; // props의 함수를 this.add에 연결, props에는 상위 컴포넌트 App.js의 함수, 매개 변수가 들어있음
  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({ item: { title: "" } });
  };

  enterKeyEventHandler = (e) => {
    if (e.key === 'Enter' && !this.state.add && !this.state.isComposing) {
      console.log('enter');
      e.preventDefault();
      this.onButtonClick();
    }
  };

  handleCompositionStart = () => {
    this.setState({ isComposing: true });
  };

  handleCompositionEnd = () => {
    this.setState({ isComposing: false });
  };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container alignItems="center">
          <Grid item xs={10} md={11} style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Add Todo here"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.title}
              onKeyDown={this.enterKeyEventHandler}
              onCompositionStart={this.handleCompositionStart}
              onCompositionEnd={this.handleCompositionEnd}
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <IconButton
              color="primary"
              onClick={this.onButtonClick}
              style={{ backgroundColor: '#3f51b5', color: 'white' }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
