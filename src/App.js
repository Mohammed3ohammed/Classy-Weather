import React from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[596, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "Not Found";
    return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
  .toUpperCase()
  .split("")
  .map((char) => 127397 + char.carCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
      weekday: "short",
  }).format(new Date(dateStr));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: "lisbon", isLoading: false,displayLocathion: "",
      weather: {}
     }
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  async fetchWeather() {
    try {
      const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);
      
      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } = 
      geoData.results.at(0);

      this.setState({displayLocathion: `${name} ${convertToFlag(country_code)}`})

      const weatherRes = await fetch (
           `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );

      const weatherData = await weatherRes.json();
      this.setState(weather: weatherData.daily);

  } catch (err) {
      console.log(err);
  } finally {
    this.setState({isLoading: false});
  }
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
        <button onClick={this.fetchWeather}>Get weather</button>
        {
          this.state.isLoading && <p className="loader">Loading...</p>
        }
      </div>
    )
  }
}

export default App;