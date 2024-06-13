import React from 'react';
import Todo from './Todo';
import './App.css';
import AddTodo from './AddTodo'
import {Paper,List,Container,Grid,Button,AppBar, Toolbar, Typography} from "@material-ui/core";
import {call, signout} from './service/ApiService.js';

class App extends React.Component {

  constructor(props){ // 매개변수 props 생성자
    super(props); // 매개변수 props 초기화
      this.state = { // item에 item.id, item.title, item.done 매개변수 이름과 값 할당
        items : [],
        loading : true,
      };
  }
  
  add = (item) => {
    console.log(item, typeof item);
    call("/todo","POST",item).then((response)=>
      {
        console.log("add 실행")
        this.get()
      }
    );
  }

  // add = (item) => {
  //   call("/todo", "POST", item).then((response) => {
  //     this.setState(prevState => ({
  //       items: [...prevState.items,] // 새로운 item을 기존 리스트에 추가
  //     }));
  //   });
  // }

  delete = (item)=>{
    call("/todo","DELETE",item).then((response) => 
      this.get()
    );
  }

  update = (item) => {
    call("/todo","PUT",item).then((response) =>
      this.setState({items:response.data})
    )
  }

  get = () => {
    call("/todo","GET",null).then((response)=>
      this.setState({items:response.data, loading:false})
    );
  }
  
/*
컴포넌트 마운팅(Mounting)은 React에서 컴포넌트가 생성되어 DOM에 삽입되는 과정을 의미합니다. 
이는 React 컴포넌트의 생명주기(Lifecycle) 중 초기 단계에 해당하며, 마운팅은 컴포넌트가 처음으로 페이지에 렌더링될 때 발생합니다.
*/

//componentDidmount는 페이지(돔) 마운트가 일어나고 렌더링 되기 전에 실행된다.
componentDidMount() {
  console.log("componentDidMount");
  this.get()
}

render(){
  // // 자바스크립트가 제공하는 Map 함수를 이용해서 배열을 반복해 생성한다. 
  // var todoItems = this.state.items.map((item,idx)=>(
  //   <Todo item={item} key={item.id}/>
  // ));
  var todoItems = this.state.items.length > 0 && (
    <Paper style={{margin:16}}>
      <List>
        {this.state.items.map((item,idx) => (
          <Todo item={item} key={item.id} delete={this.delete} update = {this.update}/>
        ))}
      </List>
    </Paper>
  );
  
  //NavigationBar
  var navigationBar = (
    <AppBar position = "static">
        <Toolbar>
          <Grid justify="space-between">
            <Grid item>
            <Typography variant="h6"> 오늘의 할일 </Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>logout
            </Button>
          </Grid>
          </Grid>
        </Toolbar>
    </AppBar>
  );


  // loading 중이 아닐 때
  var todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo add = {this.add}/>
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  )

// loading 중일 때 
var loadingPage = <h1>로딩중..!</h1>
var content = loadingPage;

if(!this.state.loading){
  content = todoListPage;
}

  // 생성된 컴포넌트 JSX를 리턴한다. 
  return (
        <div className="App"> 
        {content}
        </div>
    );
  }  
}

export default App; 