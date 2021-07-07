import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import About from './AboutComponent';
import { addComment, fetchCampsites } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites:  state.campsites,
        comments:   state.comments,
        partners:   state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites())
};

class Main extends Component {
    
    componentDidMount() {
        this.props.fetchCampsites();
    }

    render() {
        const HomePage = () => {
            return (
                <Home 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} 
                    // above line is now accessing an object named campsites from the CampsitesReducer component that includes an array named 
                    // campsites, which is why the code this.props.campsites.campsites is necessary
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]} 
                    partner={this.props.partners.filter(partner => partner.featured)[0]} 
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    // The + symbol converts a number stored as a string to a number
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    // above line is now accessing an object named campsites from the CampsitesReducer component that includes an array named 
                    // campsites, which is why the code this.props.campsites.campsites is necessary
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment}
                />
            );
        };

        return (
            <div>
                <Header />   
                <Switch> 
                    {/* use component={} when component doesn't require state/props data, otherwise use render={} 
                        when you need to pass props/"state data" to the component being routed to.*/}
                    <Route path='/home' component={HomePage} />
                    {/* 

                        Another way to code the above call to {HomePage}...
                    
                        <Route exact path="/special" render={() => <Home 
                        campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                        promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                        partner={this.props.partners.filter(partner => partner.featured)[0]}/>}/>

                    */}

                    <Route exact path='/directory' render={() => <Directory campsites={ this.props.campsites } />} />                    
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/aboutus' render={() => <About partners={ this.props.partners } />} />                     
                    <Route exact path='/contactus' component={Contact} /> 
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));