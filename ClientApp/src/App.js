import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListProjects } from './components/ListProjects';
import { Project } from './components/Project';
import { Asset } from './components/Asset';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

import ReactGA from 'react-ga';

const trackingId = "UA-76303305-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);
ReactGA.set({
    //userId: AuthorizeRoute.currentUserId(),
    // any data that is relevant to the user session
    // that you would like to track with google analytics
})

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <AuthorizeRoute path='/project' component={Project} />
                <AuthorizeRoute path='/asset' component={Asset} />
                <AuthorizeRoute path='/myprojects' component={ListProjects} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
