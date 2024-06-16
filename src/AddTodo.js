import React from "react";
import { TextField, Paper, Grid, IconButton, MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      item: { title: "", priority: "LOW" },
      isComposing: false // IME 조합 상태 추가
    };
    this.add = props.add;
  }

  handleCompositionStart = () => {
    this.setState({ isComposing: true });
  };

  handleCompositionEnd = () => {
    this.setState({ isComposing: false });
  };

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
  };

  onPriorityChange = (e) => {
    const thisItem = this.state.item;
    thisItem.priority = e.target.value;
    this.setState({ item: thisItem });
  };

  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({ item: { title: "", priority: "LOW" } });
  };

  enterKeyEventHandler = (e) => {
    if (e.key === 'Enter' && !this.state.isComposing) { // IME 조합 중이 아닐 때만 실행
      e.preventDefault();
      this.onButtonClick();
    }
  };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container alignItems="center">
          <Grid item xs={8} md={8} style={{ paddingRight: 16 }}>
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
          <Grid item xs={3} md={3}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={this.state.item.priority}
                onChange={this.onPriorityChange}
              >
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1} md={1}>
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
