// src/components/header.js
//import ReactDOM from "react-dom";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//export default ({title, emitter}) => (
//  <header>
//    <h1 onClick={e => emitter.emit("changeTitleToBar")}>{title}</h1>
//  </header>
//);

export interface Emitter {
  emit(str: string) : void;
  on(event: string, fn: Function, context?: any): Emitter;
}

export interface HeaderProps {
    title: string;
    emitter: Emitter;
}

export interface HeaderState {}

export class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return (
      <header>
        <h1 onClick={e => this.props.emitter.emit("changeTitleToBar")}>{this.props.title}</h1>
      </header>
    );
  }
}

