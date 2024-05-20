import React from 'react';
import Todo from './Todo';
import './App.css';
import AddTodo from './AddTodo.js'
import {Paper,List,Container} from "@material-ui/core";


class App extends React.Component {

  constructor(props){
    super(props);
      this.state = {
        items : [
            {id:"todo0", title:"Todo 1", done:true},
            {id:"todo1", title:"Todo 2", done:false}
        ],
      };
  }

  
  add = (item) =>{
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; // key 를 위한 id 추가
    item.done = false;
    thisItems.push(item);
    this.setState({items:thisItems}); // update state
    console.log("items:",this.state.items);
  }

  delete = (item)=>{
    const thisItems = this.state.items;
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({items:newItems},()=>{
      console.log("Update Items: ",this.state.items)
    });
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
            <Todo item={item} key={item.id} delete={this.delete}/>
          ))}
        </List>
      </Paper>
    );

    // 생성된 컴포넌트 JSX를 리턴한다. 
    return <div className="App"> 
          <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className ="TodoList">{todoItems}</div>
          </Container>
    </div>;
  }  
}
export default App; 