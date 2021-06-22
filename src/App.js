import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Main />    {/* Rendering, or calling, the Main component */}
            </div>
        );
    };
}

export default App;