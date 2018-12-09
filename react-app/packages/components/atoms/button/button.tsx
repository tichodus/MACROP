import * as React from "react";

export class Button extends React.Component {
  render() {
    return <button onClick={() => console.log("clicked")}>Click me</button>;
  }
}
