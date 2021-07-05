import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const prevent = Component => {
    class Prevent extends React.Component {

    
        render(){
           return this.props.auth.isAuth ?
                <Redirect to="/dashboard"/>
           :
                <Component {...this.props}/>
        }

    }

    const mapStateToProps = (state) => {
        return { auth: state.auth }
    }

    return connect(mapStateToProps)(Prevent);
}

export default prevent;