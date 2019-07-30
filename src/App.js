import React, { Component } from 'react';
import logo, { ReactComponent } from './logo.svg';
import './styles/style.scss';
import Modaldemo from './components/ModalOption';

class IndescisionApp extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      
      option:[],
      shouldModalOpen:undefined
    }
    this.removealloption=this.removealloption.bind(this);
    this.handlepickoption=this.handlepickoption.bind(this);
    this.handleAddoption=this.handleAddoption.bind(this);
    this.removesuboption=this.removesuboption.bind(this);
    this.clsmodal=this.clsmodal.bind(this);
  }


  //Life Cycle Method for Component
  componentDidMount()
  {
    console.log("Component is Mouted");
    const jspndata=localStorage.getItem('option');
    const jdata=JSON.parse(jspndata);
    console.log("The Store Data is",jspndata,jdata);
    if(!jdata)
    {
      this.setState(()=>{
        return{
          option:[]
        }
      })
  
    }
    else
    {
      this.setState(()=>{
        return{
          option:jdata
        }
      })
  
    }
    
  }

  componentDidUpdate(prevProps,prevState)
  {
    if(prevState.option.length !== this.state.option.length)
    {
      const jsondata=JSON.stringify(this.state.option);
      localStorage.setItem('option',jsondata);
    }
    console.log("Component will Update");
  }

  //Close the Modal for Okay Button
clsmodal()
{
   console.log("In CLose Model on Okay button");
   this.setState((prevState)=>{
     return{
       shouldModalOpen:undefined
     }
   })
}
  removealloption()
  {
    this.setState(()=>({option:[]}))
      
  }

  //remove suboption
  removesuboption(e)
  {
    this.setState((prevState)=>{
      return{
        option:prevState.option.filter((opt)=>{
          return opt !== e
        })
      }
    })
    
  }
  handlepickoption()
  {
    const randomNum=Math.floor(Math.random()*this.state.option.length);
    const option=this.state.option[randomNum];
    this.setState((prevState)=>{
      return{
        shouldModalOpen:option
      }
    })
    
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
      <div className="main_blk"> 
        <Header title={title} subtitle={subtitle}/>
        <Action hasoption={this.state.option.length > 0} handlepickoption={this.handlepickoption}/>
        <Option option={this.state.option} removealloption={this.removealloption} removesuboption={this.removesuboption}/>
        <AddOption handleAddoption={this.handleAddoption}/>
        <Modaldemo shouldModalOpen={this.state.shouldModalOpen} clsmodal={this.clsmodal}/>
      </div>
    )
  }
}


// class Header extends Component
// {
//   render()
//   {
//     return(
//       <div>
//         <h1>{this.props.title}</h1>
//         <h3>{this.props.subtitle}</h3>
//         </div>
//     )
//   }
// }

 const Header=(props)=>{
   return(
   <div className="header__block">  
     <div className="header__title">
        <h1>{props.title}</h1>
     </div>
     <div className="header_subtitle">
        <h3>{props.subtitle}</h3>
     </div>
   </div>
   )
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
        clsmodal={this.props.clsmodal}
        className="firstbtn"
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
        this.props.option.map((opt)=> <SubOption key={opt} subopt={opt} removesuboption={this.props.removesuboption}/>)
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
         <p>{this.props.subopt}<button
           onClick={()=>{
             this.props.removesuboption(this.props.subopt);
           }}
         >Remove</button></p>
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
     if(!error)
     {
       e.target.elements.option.value="";
     }
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
