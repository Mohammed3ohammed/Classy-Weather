import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: "lisbon"}
  }
  render() {
    return (
      <div className="app">
        <h1>classy Weather</h1>
        <div>
        <input type="text" placeholder="Search from lacation..."
        value={this.state.location}
        onChange={(e) => this.setState({ location: e.target.value})}
        />
        </div>
        <button>Get weather</button>
      </div>
    )
  }
}

export default App;