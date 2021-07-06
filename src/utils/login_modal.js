import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

import firebase from 'firebase/app';

const LoginModal = (props) => {
  const [error, setError] = useState('');
  const {register, handleSubmit,  formState: { errors } } = useForm();

  const handleReAuth = ({email,password}) => {
    let getUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(email,password);

    if(getUser){
      getUser.reauthenticateWithCredential(credential).then( user => {
         console.log('re auth correct, move forward');
         props.submitForm(props.modalState.formdata)
      }).catch( error =>{
          //console.log(error);
          setError('sorry, try again');
      })
    } 

  }




 


	return (
    <Modal show={props.modalState.open} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reauthentication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Sorry, we need to make sure you are you</p>
        <form onSubmit={handleSubmit(handleReAuth)}>
          <input
            type="email"
            className="form-control mb-3"
            name="email"
            placeholder="Email"
        
           {...register("email",{ 
               required: true ,
               pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
           {errors.email &&   <span className="error">Please check your email</span>}
        
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            
            {...register("password", { required: true })}
          />
           {errors.password &&   <span className="error"> Check your password</span>}

          <span className="error">{error}</span>
          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Reauth
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default LoginModal;