// src/containers/header-container.js
//import {Component} from "react";
import * as React from 'react';
//import ReactDOM from "react-dom";
import * as ReactDOM from 'react-dom';
//import {EventEmitter} from "events";
import * as EventEmitter from 'eventemitter3';
import {Header} from "../components/header";

export interface Emitter {
  emit(str: string) : void;
  on(event: string, fn: Function, context?: any): Emitter;
}

export interface HeaderContainerProps {
}

export interface HeaderContainerState {
    title: string;
}

export class HeaderContainer extends React.Component<HeaderContainerProps, HeaderContainerState> {
  emitter: Emitter;

  constructor(props: HeaderContainerProps) {
    super(props);
    this.state = {title: "foo"};
    this.emitter = new EventEmitter;

    // EventEmitter の PubSub
    // 親の責務は setState/replaceState で State 更新
    // ここを Atomic にしないと完全に見失う
    this.emitter.on("changeTitleToBar", () => {
      this.setState({title: "bar"});
    });
  }
  render(){
    // 適当にマッピングして子に渡す
    //var props = Object.assign(
    //   {},
    //   this.props,
    //   this.state,
    //   {emitter: this.emitter});

    var props = {
      title: this.state.title,
      emitter: this.emitter
    };
    return <Header {...props} />
  }
}
//// src/main.js
//import HeaderContainer from "./containers/header-container";
//import ReactDOM from "react-dom";
//ReactDOM.render(<HeaderContainer />, document.querySelector(".headerContainer"));
