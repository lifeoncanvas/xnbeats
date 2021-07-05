import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const authHoc = (Component, isAdmin = false) => {
    class AuthHoc extends React.Component {

        authCheck = () => {
            const auth = this.props.auth;  

            if(auth.isAuth){
                const role = auth.user.role;
                if(role === 1 && isAdmin ){
                    return <Redirect to="/dashboard"/>
                }
                return <Component {...this.props}/>
            } else {
                return <Redirect to="/login"/>
            }
        }

        render(){
            return this.authCheck();
        }

    }

    const mapStateToProps = (state) => {
        return { auth: state.auth }
    }

    return connect(mapStateToProps)(AuthHoc);
}

export default authHoc;