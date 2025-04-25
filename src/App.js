import React from "react";
import Input from "./components/Input";
import Weather from "./components/Weather";
import convertToFlag from "./components/ConvertToFlag";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "lisbon", isLoading: false, 
      displayLocation: "",
      weather: {},
     }
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  async fetchWeather() {

    if (this.state.location.length < 2) return this.setState({weather: {}})

    try {
      const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);
      
      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } = 
      geoData.results.at(0);

      this.setState({displayLocation: `${name} ${convertToFlag(country_code)}`,});

      const weatherRes = await fetch (
           `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );

      const weatherData = await weatherRes.json();
      this.setState({weather: weatherData.daily});

  } catch (err) {
      console.log(err);
  } finally {
    this.setState({isLoading: false});
  }
  }

  setLocation = (e) => this.setState({ location: e.target.value});

  componentDidMount() {
    this.fetchWeather();

    this.setState({location: localStorage.getItem('location') || ""});
  }

  componentDidUpdate( prevProps, prevState ) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();

      localStorage.setItem('location', this.state.location) 
    }
  }


  render() {
    return (
      <div className="app">
        <h1>classy Weather</h1>
        <Input 
        location={this.state.location} 
        onChangeLocation={this.setLocation}
        />
        <button onClick={this.fetchWeather}>Get weather</button>
        {
          this.state.isLoading && <p className="loader">Loading...</p>
        }

        {this.state.weather.weathercode && (
          <Weather
          weather={this.state.weather}
          location={this.state.displayLocation}
          />
        )}
      </div>
    )
  }
}

export default App;