import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import ultraStyles from './ultraStyles'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'
import { Flex, Box } from 'grid-styled'

import './App.css';

// const WUNDERGROUND_KEY = "cc915e0f66c67f51";

const ICON_SET = {
    "Light Drizzle": "rainy",
    "Light Rain": "rainy",
    "Light Snow": "snowy",
    "Light Snow Grains": "snowy",
    "Light Ice Crystals": "snowy",
    "Light Ice Pellets": "snowy",
    "Light Hail": "stormy",
    "Light Mist": "cloudy",
    "Light Fog": "cloudy",
    "Light Fog Patches": "cloudy",
    "Light Smoke": "cloudy",
    "Light Volcanic Ash": "cloudy",
    "Light Widespread Dust": "cloudy",
    "Light Sand": "cloudy",
    "Light Haze": "cloudy",
    "Light Spray": "cloudy",
    "Light Dust Whirls": "cloudy",
    "Light Sandstorm": "cloudy",
    "Light Low Drifting Snow": "snowy",
    "Light Low Drifting Widespread Dust": "cloudy",
    "Light Low Drifting Sand": "cloudy",
    "Light Blowing Snow": "snowy",
    "Light Blowing Widespread Dust": "cloudy",
    "Light Blowing Sand": "cloudy",
    "Light Rain Mist": "cloudy",
    "Light Rain Showers": "rainy",
    "Light Snow Showers": "snowy",
    "Light Snow Blowing Snow Mist": "snowy",
    "Light Ice Pellet Showers": "snowy",
    "Light Hail Showers": "stormy",
    "Light Small Hail Showers": "stormy",
    "Light Thunderstorm": "stormy",
    "Light Thunderstorms and Rain": "stormy",
    "Light Thunderstorms and Snow": "snowy",
    "Light Thunderstorms and Ice Pellets": "snowy",
    "Light Thunderstorms with Hail": "stormy",
    "Light Thunderstorms with Small Hail": "stormy",
    "Light Freezing Drizzle": "rainy",
    "Light Freezing Rain": "rainy",
    "Light Freezing Fog": "cloudy",
    "Heavy Drizzle": "rainy",
    "Heavy Rain": "rainy",
    "Heavy Snow": "snowy",
    "Heavy Snow Grains": "snowy",
    "Heavy Ice Crystals": "snowy",
    "Heavy Ice Pellets": "snowy",
    "Heavy Hail": "stormy",
    "Heavy Mist": "cloudy",
    "Heavy Fog": "cloudy",
    "Heavy Fog Patches": "cloudy",
    "Heavy Smoke": "cloudy",
    "Heavy Volcanic Ash": "cloudy",
    "Heavy Widespread Dust": "cloudy",
    "Heavy Sand": "cloudy",
    "Heavy Haze": "cloudy",
    "Heavy Spray": "cloudy",
    "Heavy Dust Whirls": "cloudy",
    "Heavy Sandstorm": "cloudy",
    "Heavy Low Drifting Snow": "snowy",
    "Heavy Low Drifting Widespread Dust": "cloudy",
    "Heavy Low Drifting Sand": "cloudy",
    "Heavy Blowing Snow": "snowy",
    "Heavy Blowing Widespread Dust": "cloudy",
    "Heavy Blowing Sand": "cloudy",
    "Heavy Rain Mist": "cloudy",
    "Heavy Rain Showers": "rainy",
    "Heavy Snow Showers": "snowy",
    "Heavy Snow Blowing Snow Mist": "snowy",
    "Heavy Ice Pellet Showers": "snowy",
    "Heavy Hail Showers": "stormy",
    "Heavy Small Hail Showers": "stormy",
    "Heavy Thunderstorm": "stormy",
    "Heavy Thunderstorms and Rain": "stormy",
    "Heavy Thunderstorms and Snow": "stormy",
    "Heavy Thunderstorms and Ice Pellets": "stormy",
    "Heavy Thunderstorms with Hail": "stormy",
    "Heavy Thunderstorms with Small Hail": "stormy",
    "Heavy Freezing Drizzle": "stormy",
    "Heavy Freezing Rain": "stormy",
    "Heavy Freezing Fog": "cloudy",
    "Patches of Fog": "cloudy",
    "Shallow Fog": "cloudy",
    "Partial Fog": "cloudy",
    "Overcast": "cloudy",
    "Clear": "sunny",
    "Partly Cloudy": "rainbow",
    "Mostly Cloudy": "rainbow",
    "Scattered Clouds": "rainbow",
    "Small Hail": "stormy",
    "Squalls": "cloudy",
    "Funnel Cloud": "cloudy",
    "Unknown Precipitation": "rainy",
    "Unknown": "cloudy",
    chancesleet: "snowy",
    chancesnow: "snowy",
    clear: "sunny",
    flurries: "snowy",
    fog: "cloudy",
    hazy: "cloudy",
    rain: "rainy",
    chancerain: "rainy",
    sleet: "snowy",
    snow: "snowy",
    chanceflurries: "snowy",
    tstorms: "stormy",
    chancetstorms: "stormy",
    sunny: "sunny",
    mostlysunny: "rainbow",
    partlysunny: "rainbow",
    partlycloudy: "cloudy",
    mostlycloudy: "cloudy",
    cloudy: "cloudy"
};

const SUPPORTED_LANGUAGES = [
    "AF", "AL", "AR", "HY", "AZ",
    "EU", "BY", "BU", "LI", "MY",
    "CA", "CN", "TW", "CR", "CZ",
    "DK", "DV", "NL", "EN", "EO",
    "ET", "FA", "FI", "FR", "FC",
    "GZ", "DL", "KA", "GR", "GU",
    "HT", "IL", "HI", "HU", "IS",
    "IO", "ID", "IR", "IT", "JP",
    "JW", "KM", "KR", "KU", "LA",
    "LV", "LT", "ND", "MK", "MT",
    "GM", "MI", "MR", "MN", "NO",
    "OC", "PS", "GN", "PL", "BR",
    "PA", "RO", "RU", "SR", "SK",
    "SL", "SP", "SI", "SW", "CH",
    "TL", "TT", "TH", "TR", "TK",
    "UA", "UZ", "VU", "CY", "SN",
    "JI", "YI"
];

function getIcon(icon) {
    return ICON_SET[icon];
}

function getTemp (text) {
    return (text.match(/(\-?[0-9]+)/) || [])[1];
}


class App extends Component {

  constructor (props) {
      super(props);
      this.state = {
        address: '',
        geocodeResults: null,
        loading: false
      }
      this.handleSelect = this.handleSelect.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
      this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
      var options = {
    	  enableHighAccuracy: true,
    	  timeout: 5000,
    	  maximumAge: 0
      };

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(pos => {
              this.setState({
                  coordinates: pos.coords
              });
              this.check();
          }, () => {
              this.check();
          }, options);
      }

      this.check();

      setInterval(() => this.check(), 10 * 60 * 1000);
  }

  check () {
      fetch("https://ipinfo.io/json")
        .then(res => res.json())
        .then(ip => {
            let lang = ip.country;
            if (!SUPPORTED_LANGUAGES.includes(lang)) {
                lang = "EN";
            }
            let crd = this.state.coordinates;
            crd = crd || {
                latitude: +ip.loc.split(",")[0]
              , longitude: +ip.loc.split(",")[1]
            }
//            const query = [crd.latitude, crd.longitude].join(",");
//            const WUNDERGROUND_URL = `https://api.wunderground.com/api/${WUNDERGROUND_KEY}/conditions/lang:${lang}/q/${query}.json`;
            const ULTRA_URL = `https://q9syafn1oh.execute-api.us-east-1.amazonaws.com/prod/weather`
            return fetch(ULTRA_URL, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "lat": crd.latitude,
                  "lon": crd.longitude
              })
            })
        })
        .then(c => c.json())
        .then(weather => {
            this.setState({
                weather,
                loading: false
            });
        })
        .catch((error) => {
           // Handle error here
           weather: undefined;
       });

  }

  getWeather(lat, long) {
            const ULTRA_URL = `https://q9syafn1oh.execute-api.us-east-1.amazonaws.com/prod/weather`
            return fetch(ULTRA_URL, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "lat": lat,
                  "lon": long
              })
            })
        .then(c => c.json())
        .then(weather => {
            this.setState({
                weather,
                loading: false
            });
        })
        .catch((error) => {
          // Handle error here
          weather: undefined;
        });
  }


renderHeader () {
    const weather = this.state.weather;
    var location = weather.city + ", " + weather.country_name;
    var formated_location = location.toUpperCase();

    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
        <div className="Demo__suggestion-item">
          <i className='fa fa-map-marker Demo__suggestion-icon'/>
          <strong>{formattedSuggestion.mainText}</strong>{' '}
          <small className="text-muted">{formattedSuggestion.secondaryText}</small>
        </div>)

    const inputProps = {
          type: "text",
          value: this.state.address,
          onChange: this.handleChange,
          onBlur: () => { console.log('Blur event!'); },
          onFocus: () => { console.log('Focused!'); },
          autoFocus: true,
          placeholder: formated_location,
          name: 'Demo__input',
          id: "my-input-id",
        }

      return (
        <div>
          <img className='logo' src='images/logoHorizontalWhite2.png'/>
          <Flex p={2} wrap align='right'>
            	<Box flex='1 1 auto' p={0}>
            		SHOW ME THE WEATHER IN
            	</Box>
            	<Box flex='1 1 auto' p={0}>
                <PlacesAutocomplete
                  onSelect={this.handleSelect}
                  autocompleteItem={AutocompleteItem}
                  onEnterKeyDown={this.handleSelect}
                  classNames={cssClasses}
                  inputProps={inputProps}
                  styles = {ultraStyles}
                />
            	</Box>
          </Flex>
          <div className="overlay">
            <OverlayLoader
              color={'white'} // default is white
              loader="ScaleLoader" // check below for more loaders
              text="Loading... Please wait!"
              active={this.state.loading}
              backgroundColor={'red'} // default is black
              opacity=".4" // default is .9
              > </OverlayLoader>
          </div>
        </div>
      );
  }

  renderWeatherToday () {
      const weather = this.state.weather;
      var city = "N/A";
      var country_name = "N/A";
      var condition = "N/A";
      var weather_name = "N/A";
      var uv = "N/A";
      var local_time = "N/A";
      if (weather !== undefined) {
         city = weather.city;
         country_name = weather.country_name;
         condition = weather.condition;
         weather_name = weather.weather;
         uv = weather.uv;
         local_time = weather.local_time;
      }
      var uvi = Math.round(parseFloat(uv));


      let icon = getIcon(weather_name);
      if( icon === undefined ) {
        icon = "sunny";
      }

      // Handle empty weather here
      // xxx

      let hours = parseInt(local_time.split(":")[0]);

      // If it's night then show night icons
      if ((icon === "sunny" || icon === "clear") && (hours > 20 || hours < 7)) {
          icon = "starry";
      }

      // format temperature
      if (!Number.isInteger(uvi)) {
        uvi = "?"
      }
      if (uvi < 0 ) {
        uvi = 0;
      }

      var uviElm = <div className="big-uvi">{uvi}</div>;


      var formated_time = city + ", " + country_name;
      return (
            <Flex wrap>
              <Box px={1} py={1} width={1}>
                <p className="location-description">{formated_time}</p>
              </Box>
              <Box px={1} py={1} width={1}>
                <p className="time-description">{local_time}</p>
              </Box>
              <Box p={1} width={1/2}>
                <div className="icon-wrapper">
                   <div className={`icon-big ${icon}`} >
                   </div>
                   {uviElm}
                 </div>
              </Box>
              <Box p={1} width={1/2}>
                {uviElm}
              </Box>
                <Box p={1} width={1}>
                <p className="condition-description">{condition}</p>
              </Box>
          </Flex>
      );
  }

  renderTemperature () {
      const weather = this.state.weather;
      const temp = weather.temperatureF;
      if (temp) {
          var tempElm = <div className="small-temp">{temp}</div>;
      }

      return (
        <Flex>
        	<Box p={0}>
        		TEMPERATURE
        	</Box>
        	<Box p={0} ml='auto'>
        		{tempElm}
        	</Box>
        </Flex>
      );
  }

  renderHumidity () {
      const weather = this.state.weather;
      const humidity = weather.rel_humidity.substring(0, weather.rel_humidity.length-1);;
      if (humidity) {
          var humidityElm = <div className="small-humidity">{humidity}</div>;
      }

      return (
        <Flex>
        	<Box p={0}>
        		HUMIDITY
        	</Box>
        	<Box p={0} ml='auto'>
        		{humidityElm}
        	</Box>
        </Flex>
      );
  }

  renderWind () {
      const weather = this.state.weather;
      const wind = weather.wind_speed_mph;
      if (wind) {
          var windElm = <div className="small-wind">{wind}</div>;
      }

      return (
        <Flex>
        	<Box p={0}>
        		WIND
        	</Box>
        	<Box p={0} ml='auto'>
        		{windElm}
        	</Box>
        </Flex>
      );
  }

  renderProvider () {
      const weather = this.state.weather;
      const provider = weather.provider + "-" + weather.method;
      if (provider) {
          var providerElm = <div className="small-provider">{provider}</div>;
      }

      return (
        <Flex>
        	<Box p={0}>
        		SERVICE PROVIDER
        	</Box>
        	<Box p={0} ml='auto'>
        		{providerElm}
        	</Box>
        </Flex>
      );
  }

renderDay (day, index) {
      const weather = this.state;
      const temp = getTemp(weather.temperatureF);
      if (temp) {
          var tempElm = <div className="small-temp">{temp}</div>;
      }

      return (
            <div className="day" key={index}>
                <div className="day-description">
                    {weather.weather}
                </div>
                <div className="icon-wrapper">
                    <div className={`icon-small ${getIcon(weather.weather)}`}>
                    </div>
                    {tempElm}
                </div>
            </div>
      );
  }

  renderWeather () {
      if (!this.state.weather) {
          return (
            <div>
              <div className="weather-container">
                  <p>Loading...</p>
              </div>
            </div>
          );
      }
      return (
        <div>
            <div className="weather-container">
              {this.renderHeader()}
              {this.renderWeatherToday()}
              {this.renderTemperature()}
              {this.renderHumidity()}
              {this.renderWind()}
              {this.renderProvider()}
          </div>
        </div>
      );
  }

  render() {
    return (
        <div>
          <div className="app">
                {this.renderWeather()}
            </div>
        </div>
    );
  }

  handleSelect(address) {
  this.setState({
    address,
    loading: true
  })

  geocodeByAddress(address)
    .then((results) => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      console.log('Success Yay', { lat, lng })
      this.setState({
        geocodeResults: this.renderGeocodeSuccess(lat, lng),
      })
    })
    .catch((error) => {
      console.log('Oh no!', error)
      this.setState({
        geocodeResults: this.renderGeocodeFailure(error),
      })
    })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })
  }

renderGeocodeFailure(err) {
//  loading: false;
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Error!</strong> {err}
    </div>
  )
}

renderGeocodeSuccess(lat, lng) {
  this.getWeather(lat,lng);
}

}
export default App;
