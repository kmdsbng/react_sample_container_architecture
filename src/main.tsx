///<reference path="../typings/bundle.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface HelloWorldProps {};
interface HelloWorldStates {};

class HelloWorld extends React.Component<HelloWorldProps, HelloWorldStates> {
  render() {
    return (
        <div>
          Hello, World!
        </div>
    );
  }
}

ReactDOM.render(
    <HelloWorld />,
    document.getElementById('my-app'));




