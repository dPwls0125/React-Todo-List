import React from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton, Typography, Grid } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import './App.css'; // CSS 파일을 가져옵니다.

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true };  // 매개변수 item 의 변수/값을 item에 대입
    this.delete = props.delete;
    this.update = props.update;
    this.get = props.get;
  }

  deleteEventHandler = () => {
    this.delete(this.state.item);
  }

  offReadOnlyMode = () => {
    console.log("Event!", this.state.readOnly);
    this.setState({ readOnly: false }, () => {
      console.log("ReadOnly?", this.state.readOnly);
    });
  }

  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.setState({ readOnly: true });
      this.update(this.state.item);
    }
  }

  editEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
  }

  checkboxEventHandler = (e) => {
    console.log("check box event call");
    const thisItem = this.state.item;
    thisItem.done = thisItem.done ? false : true; // thisItem.done = !thisItem.done
    this.setState({ item: thisItem });
    this.update(this.state.item);
  }

  render() {
    const item = this.state.item;
    const priorityColors = {
      HIGH: 'red',
      MEDIUM: 'orange',
      LOW: 'green'
    };
    return (
      <ListItem>
        <Checkbox
          checked={item.done}
          onChange={this.checkboxEventHandler}
        />
        <ListItemText>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <InputBase
                inputProps={{ "aria-label": "naked", readOnly: this.state.readOnly }}
                type="text"
                id={item.id}
                name={item.id}
                value={item.title}
                multiline={true}
                fullWidth={true}
                onClick={this.offReadOnlyMode}
                onChange={this.editEventHandler}
                onKeyPress={this.enterKeyEventHandler}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" style={{ color: priorityColors[item.priority] }}>
                {item.priority}
              </Typography>
            </Grid>
          </Grid>
        </ListItemText>

        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
