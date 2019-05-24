/* eslint no-restricted-globals: 0 */

import React from "react";
import { Terminal } from "xterm";
import _ from "lodash";
import * as attach from "xterm/lib/addons/attach/attach";
import * as fit from "xterm/lib/addons/fit/fit";
import * as fullscreen from "xterm/lib/addons/fullscreen/fullscreen";

import "xterm/dist/xterm.css";
import "xterm/dist/addons/fullscreen/fullscreen.css";

const className = require("classnames");
// const debounce = require('lodash.debounce');

// require("node_modules/xterm/xterm.css");

export interface IXtermProps extends React.DOMAttributes<{}> {
  onChange?: (e) => void;
  onInput?: (e) => void;
  onFocusChange?: Function;
  onScroll?: (e) => void;
  onContextMenu?: (e) => void;
  options?: any;
  path?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}
export interface IXtermState {
  isFocused: boolean;
}

export default class XTerm extends React.Component<IXtermProps, IXtermState> {
  xterm: any;
  container: HTMLDivElement | null;
  terminalSocket: WebSocket;
  communicationSocket: WebSocket;

  state = {
    isFocused: false
  };

  applyAddon(addon) {
    Terminal.applyAddon(addon);
  }
  componentDidMount() {
    Terminal.applyAddon(attach);
    Terminal.applyAddon(fit);
    Terminal.applyAddon(fullscreen);

    this.xterm = new Terminal(this.props.options);

    // const protocol = location.protocol === "https:" ? "wss://" : "ws://";
    // const socketURL = `${protocol}${location.hostname}:8080/`;
    // const socketURL = `ws://127.0.0.1:8080/websocket`;
    const terminalSocketURL = `ws://0.0.0.0:3001/shell`;

    const terminalSocket = new WebSocket(terminalSocketURL);

    console.log(terminalSocket);

    this.xterm.attach(terminalSocket);

    if (this.container) this.xterm.open(this.container);

    this.xterm.on("focus", this.focusChanged.bind(this, true));
    this.xterm.on("blur", this.focusChanged.bind(this, false));

    // this.xterm.toggleFullScreen();

    // this.sock.addEventListener("open", function() {
    //   this.xterm.terminadoAttach(this.sock);
    // });

    if (this.props.onContextMenu) {
      this.xterm.element.addEventListener(
        "contextmenu",
        this.onContextMenu.bind(this)
      );
    }
    if (this.props.onInput) {
      this.xterm.on("data", this.onInput);
    }
    if (this.props.value) {
      this.xterm.write(this.props.value);
    }
  }
  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
    if (this.xterm) {
      this.xterm.destroy();
      // this.xterm = null;
    }
  }
  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.hasOwnProperty('value')) {
  //         this.setState({ value: nextProps.value });
  //     }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate', nextProps.hasOwnProperty('value'), nextProps.value != this.props.value);
    if (
      nextProps.hasOwnProperty("value") &&
      nextProps.value !== this.props.value
    ) {
      if (_.isNil(this.xterm) === false) {
        this.xterm.clear();
        setTimeout(() => {
          this.xterm.write(nextProps.value);
        }, 0);
      }
    }
    return false;
  }
  getTerminal() {
    return this.xterm;
  }
  write(data: any) {
    this.xterm && this.xterm.write(data);
  }
  writeln(data: any) {
    this.xterm && this.xterm.writeln(data);
  }
  focus() {
    if (this.xterm) {
      this.xterm.focus();
    }
  }
  focusChanged(focused) {
    this.setState({
      isFocused: focused
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  }
  onInput = data => {
    this.props.onInput && this.props.onInput(data);
  };

  resize(cols: number, rows: number) {
    this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
  }
  setOption(key: string, value: boolean) {
    this.xterm && this.xterm.setOption(key, value);
  }
  refresh() {
    this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
  }

  onContextMenu(e) {
    this.props.onContextMenu && this.props.onContextMenu(e);
  }

  fit() {
    this.xterm.fit();
  }
  toggleFullscreen() {
    this.xterm.toggleFullScreen();
  }

  render() {
    const terminalClassName = className(
      "ReactXTerm",
      this.state.isFocused ? "ReactXTerm--focused" : null,
      this.props.className
    );

    return (
      <div>
        <div
          ref={ref => (this.container = ref)}
          className={terminalClassName}
        />
        <button onClick={() => this.fit()}>fits</button>
        <button onClick={() => this.toggleFullscreen()}>fullscreen</button>
      </div>
    );
  }
}
export { Terminal, XTerm };
