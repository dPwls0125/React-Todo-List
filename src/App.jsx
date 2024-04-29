import React from 'react';
import Hello from './Hello';
import './App.css';
import Button from './components/Button'

function App() {
    return (
      <>
      <Button text={"메일"} color={"red"}/>
      <Button text={"카페"}/>
      <Button text = {"블로그"}/>
      </>
  );
}
export default App;
