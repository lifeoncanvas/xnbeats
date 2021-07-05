import React, { Component } from 'react';
import { registerUser, loginUser } from '../../store/actions';
import prevent from '../hoc/prevent';

import { toast } from 'react-toastify';

class Login extends Component {

  state = {
    formdata: {
      name: 'francis',
      lastname: 'jones',
      password: 'testing123',
      email: 'francis@gmail.com'
    },
    register: false,
    loading: false
  }

  handleFormType = () => {
    this.setState( prevState => ({
      register: !prevState.register
    }))
  }


  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading:true})
    if(this.state.register){
      this.props.dispatch(registerUser(this.state.formdata)).then(
        ({payload}) => this.handleRedirection(payload)
      )
    } else {
      this.props.dispatch(loginUser(this.state.formdata)).then(
        ({payload}) => this.handleRedirection(payload)
      )
    }
  }

  handleRedirection = result => {
    if(result.error){
        this.setState({loading: false});
        toast.error(result.error,{
          position: toast.POSITION.BOTTOM_RIGHT
        })
    } else {
      return this.props.history.push('/dashboard');
    }
  }


  handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState( prevState => ({
        formdata:{
          ...prevState.formdata,
          [name]: value
        }
    }))
  }


  render() {
    const {register,formdata,loading} = this.state;
    let formTitle = register ? 'Register' : 'Sign in'
    return (
      <>
        <div className="container login-wrapper">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">
              {formTitle}
            </h1>

            {
              register ?
              <>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control mb-3"
                  placeholder="Your name"
                  onChange={this.handleInputs}
                  value={formdata.name}
                />

                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="form-control mb-3"
                  placeholder="Your lastname"
                  onChange={this.handleInputs}
                  value={formdata.lastname}
                />
              </>
            :null
            }
           


            <input
              type="email"
              id="email"
              name="email"
              className="form-control mb-3"
              placeholder="Email address"
              onChange={this.handleInputs}
              value={formdata.email}
            />

            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={this.handleInputs}
              value={formdata.password}
            />

            <br />
            <button
              className="btn btn-lg btn-primary btn-block"
              type="submit"
              disabled={loading}
            >
              {formTitle}
            </button>

            <div className="mt-3">
         
              { register ? 'Need to sign in':'Not registered'} ? click
              <span
                className="login_type_btn"
                onClick={ ()=> this.handleFormType()}
              > here </span>
                to { register ? 'Sign in':'Register'}
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default prevent(Login);