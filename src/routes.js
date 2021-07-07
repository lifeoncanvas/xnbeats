import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ToastsComponent from './utils/toasts';
import { connect } from 'react-redux';
import { autoSignIn, logoutUser } from './store/actions';
import AuthHoc from './components/hoc/authHoc';

import Header from './components/header';
import Footer from './components/footer';

import Home from './components/home';
import Login from './components/login';
import Contact from './components/contact';
import Dashboard from './components/dashboard';
import Reviews from './components/dashboard/reviews';
import Profile from './components/dashboard/profile';
import ReviewAddEdit from './components/dashboard/reviews/add_edit';


class Routes extends Component {

    componentDidMount() {
        this.props.dispatch(autoSignIn());
    }

    handleLogout = () => this.props.dispatch(logoutUser());

    app = auth => (
        <>
            <BrowserRouter>
                <Header 
                    auth={auth}
                    logout={this.handleLogout}
                />
                <Switch>
                    <Route path="/dashboard/reviews/edit/:id" component={AuthHoc(ReviewAddEdit,true)} />
                    <Route path="/dashboard/reviews/add" component={AuthHoc(ReviewAddEdit,true)} />
                    <Route path="/dashboard/reviews" component={AuthHoc(Reviews,true)} />
                    <Route path="/dashboard/profile" component={AuthHoc(Profile)} />
                    <Route path="/dashboard" component={AuthHoc(Dashboard)} />
                    <Route path="/login" component={Login} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
                <ToastsComponent />
            </BrowserRouter>
        </>
    )

    render() {
        const {auth} = this.props;
        return auth.checkingAuth ? this.app(auth) : '...loading';
    }
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps)(Routes);