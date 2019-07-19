import React, { Component } from 'react';
import axios from 'axios';
import Title from './Title';
class Post extends Component {
    state={
        post:[]
    }
    componentDidMount()
    {
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>{
            const updatedPost=res.data.slice(0,4)
            this.setState({
                post:updatedPost
            })
          }
          ).catch((err)=>{
            console.log("The Error is",err);
          })    
    }
    render() {
        const posts=this.state.post.map(res=>{
            return <Title  key={res.id} Title={res.title}/>;
        })
        return (
            <div>
              <p>{posts}</p>
            </div>
        );
    }
}

export default Post;