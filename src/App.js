import React from 'react';
import Todo from './Todo';
import './App.css';
import AddTodo from './AddTodo'
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography, ButtonGroup } from "@material-ui/core";
import { call, signout } from './service/ApiService.js';
import PhraseComponent from './PhraseComponent.js'; 

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      page: 0,
      size: 5,
      totalPages: 1,
    };
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) => {
      this.get(this.state.page, this.state.size);
    });
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.get(this.state.page, this.state.size)
    );
  }

  update = (item) => {
    console.log("Updating item:", item); // 데이터 확인용 로그 추가
    call("/todo", "PUT", item).then((response) => {
      console.log("Update response:", response); // 응답 로그 추가
      this.get(this.state.page, this.state.size);
      console.log("update 메서드 종료");
    }).catch((error) => {
      console.error("Failed to update todo", error);
    });
}
  get = (page = this.state.page, size = this.state.size) => {
    call(`/todo/page?page=${page}&size=${size}`, "GET", null).then((response) => {
      console.log("Fetched todos:", response); // 응답 객체 구조 확인
      this.setState({ items: response.content || [], loading: false, totalPages: response.totalPages || 1 });
    }).catch((error) => {
      console.error("Failed to fetch todos", error);
    });
  }

  handlePageChange = (newPage) => {
    this.setState({ page: newPage, loading: true }, () => {
      this.get(newPage, this.state.size);
    });
  }

  componentDidMount() {
    this.get();
  }

  render() {
    const { items, loading, page, totalPages } = this.state;

    var todoItems = items && items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>logout</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    var pagination = (
      <ButtonGroup>
        <Button disabled={page === 0} onClick={() => this.handlePageChange(page - 1)}>이전</Button>
        <Button disabled={page >= totalPages - 1} onClick={() => this.handlePageChange(page + 1)}>다음</Button>
      </ButtonGroup>
    );

    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
        <PhraseComponent />
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
          {pagination}
        
        </Container>
      </div>
    );

    var loadingPage = <h1>로딩중..!</h1>;
    var content = loadingPage;

    if (!loading) {
      content = todoListPage;
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
