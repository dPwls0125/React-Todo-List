import React from 'react';
import Todo from './Todo';
import './App.css';
import AddTodo from './AddTodo.js'
import {Paper,List,Container} from "@material-ui/core";
import {call} from './service/ApiService.js';

class App extends React.Component {

  constructor(props){
    super(props);
      this.state = {
        items : [
        ],
      };
  }
  
  add = (item) => {
    call("/todo","POST",item).then((response)=>
      this.setState({items:response.data})
    );
  }
    // const thisItems = this.state.items;
    // item.id = "ID-" + thisItems.length; // key 를 위한 id 추가
    // item.done = false;
    // thisItems.push(item);
    // this.setState({items:thisItems}); // update state
    // console.log("items:",this.state.items);
  

  delete = (item)=>{
    call("/todo","DELETE",item).then((response) => 
      this.setState({items:response.data})
    );
    
  }

  update = (item) => {
    call("/todo","PUT",item).then((response) =>
      this.setState({items:response.data})
    )
  }


componentDidMount() {
  call("/todo","GET", null).then((response)=>
    this.setState({items:response.data})
  );
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

    // 생성된 컴포넌트 JSX를 리턴한다. 
    return (<div className="App"> 
          <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className ="TodoList">{todoItems}</div>
          </Container>
    </div>
    );
  }  
}

export default App; 