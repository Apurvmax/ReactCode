import React, { Component } from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

class IndescisionApp extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      
      option:[]
    }
    this.removealloption=this.removealloption.bind(this);
    this.handlepickoption=this.handlepickoption.bind(this);
    this.handleAddoption=this.handleAddoption.bind(this);
  }
  removealloption()
  {
    this.setState(()=>{
      return{
          option:[]
      };
    })
  }

  handlepickoption()
  {
    const randomNum=Math.floor(Math.random()*this.state.option.length);
    const option=this.state.option[randomNum];
    alert(option);
  } 
  //add option into option array from form data
  handleAddoption(option)
  {
    if(!option)
    {
      return "Enter at least one Option Value";
    }
    else if(this.state.option.indexOf(option)> -1)
    {
      return "Value can not be Duplicate";
    }

    this.setState((prevState)=>{
      return{
      option:prevState.option.concat([option])
    }
    })
  }
  render() {
    let title="Indecision App";
    let subtitle="These is the Indescision App";
     
    return(
      <div>
        <Header title={title}/>
        <Action hasoption={this.state.option.length > 0} handlepickoption={this.handlepickoption}/>
        <Option option={this.state.option} removealloption={this.removealloption}/>
        <AddOption handleAddoption={this.handleAddoption}/>
      </div>
    )
  }
}


class Header extends Component
{
  render()
  {
    return(
      <div>
        <h1>{this.props.title}</h1>
        <h3>{this.props.subtitle}</h3>
        </div>
    )
  }
}

class Action extends Component
{
  constructor(props)
  {
    super(props);
    this.actbtn=this.actbtn.bind(this);
  }
  actbtn()
  {
    alert('Hello');
  }
  render() {
    return (
      <div>
        <button
        onClick={this.props.handlepickoption}
        disabled={!this.props.hasoption}
        >What should I do</button>
      </div>
    );
  }
}
class Option extends Component
{
  constructor(props)
  {
    super(props);
    this.removeall=this.removeall.bind(this);
  }
  removeall(){
    console.log("The Props options are",this.props.option);
  }
  render()
  {
    return(
      <div>
      <button onClick={this.props.removealloption}>Remove Option Entry</button>
        <p>The Length of Options array:-</p>
        {
        this.props.option.map((opt)=> <SubOption key={opt} subopt={opt}/>)
        }
      
      </div>
    )
  }
}

class SubOption extends Component
{
  render() {
    return (
      <div>
         <p>{this.props.subopt}</p>
      </div>
    );
  }
}

class AddOption extends Component
{
  constructor(props)
  {
    super(props);
    this.handleaddoption=this.handleaddoption.bind(this);
    this.state={
      error:undefined
    }
  }
  handleaddoption(e)
  {
    e.preventDefault();
     const optionval=e.target.elements.option.value;
     console.log("The Optionvalue",optionval)
     const error=this.props.handleAddoption(optionval)
     this.setState(()=>{
       return {
         error
       }
     })   
     
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleaddoption}>
           <input type="text" name="option" />
           <button>Add Option</button>          
        </form>
      </div>
    );
  }
}
export default IndescisionApp;
