import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';

const store = ConfigureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>   
            {/* This makes the redux store, defined above, available to all connected 
                components that are children of App */}
                <BrowserRouter>
                    <div className="App">
                        <Main />    {/* Rendering, or calling, the Main component */}
                    </div>
                </BrowserRouter>
            </Provider>
        );
    };
}

export default App;