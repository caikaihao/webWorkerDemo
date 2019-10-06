import React, { Component } from 'react'
import './App.css';

import myWorker from './worker/file.worker.js';




class App extends Component {
  constructor() {
    super()
    this.state = {counter: 0, number: 0, result: ''}
    this.postMessageToWorker = this.postMessageToWorker.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  componentDidMount() {
    const _this = this
    this.worker = new myWorker();
    
    this.worker.onmessage = function (event) {
      _this.setState({
        result: event.data
      })
    };
  }
  postMessageToWorker() {
    this.worker.postMessage(this.state.number);
  }
  inputChange(e) {
    let value =  e.target.value
    let number = value.replace(/[^0-9]/g,'')
    this.setState({
      number: parseInt(number || 0)
    })
  }

  render() {
    return (
      <div className="App">
        <input type="text" onChange={this.inputChange} value={this.state.number}/>

        <button onClick={this.postMessageToWorker} className='worker'>向worker发送斐波那契数列计算</button>
        <p>计算结果为：{this.state.result}</p>
        <p>打开控制台查看计算时间</p>
      </div>
    );
  }
}

export default App;
