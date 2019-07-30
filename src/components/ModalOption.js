import React, { Component } from 'react';
import Modal  from  'react-modal';

const Modaldemo=(props)=>(
  
        <Modal 
        isOpen={!!props.shouldModalOpen}
        onRequestClose={props.clsmodal}
        >
             {props.shouldModalOpen}
             <button onClick={props.clsmodal}>Okay</button>
        </Modal>
)


export default Modaldemo;