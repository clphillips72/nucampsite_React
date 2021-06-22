import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';
import CampsiteInfo from './CampsiteInfoComponent';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {  campsites: CAMPSITES,
                        selectedCampsiteId: null
         };
    }

    onCampsiteSelect(campsiteId) {
        console.log(`Entering onCampsiteSelect for id: ${campsiteId}`);
        this.setState({selectedCampsiteId: campsiteId});
    }

    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
                <Directory campsites={ this.state.campsites } onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>    
                    {/* Rendering, or calling, the Directory component
                        and passing an onClick event handler as a prop */}
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsiteId)[0]} />
                    {/* Rendering, or calling, the CampsiteInfo component
                        First, find the specific campsite.Id in the campsites array 
                           and pass that one Object (not an array) to the CampsiteInfo component */}
            </div>
        );
    }
}

export default Main;