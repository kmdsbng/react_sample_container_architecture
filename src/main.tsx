///<reference path="../typings/bundle.d.ts" />

//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import {Header} from './components/header'

//interface HelloWorldProps {};
//interface HelloWorldStates {};
//
//class HelloWorld extends React.Component<HelloWorldProps, HelloWorldStates> {
//  render() {
//    return (
//        <div>
//          Hello, World!
//        </div>
//        <Header />
//    );
//  }
//}
//
//ReactDOM.render(
//    <HelloWorld />,
//    document.getElementById('my-app'));


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HeaderContainer} from "./containers/header-container";
ReactDOM.render(<HeaderContainer />,
    document.getElementById('my-app'));


