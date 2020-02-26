import React from 'react';
import {Alert, View, Text} from 'react-native';
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "6420351a926dc59bf08ae6d12e5cc3f2";

export default class extends React.Component {
  state = {
    isLoading : true,
  };
  
  getWeather = async(latitude ,longitude) => {
    const {data} = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    console.log(data);
    this.setState({
      isLoading:false,
      temp:data.main.temp,
      condition:data.weather[0].main,
      cityName:data.name,
      humidity:data.main.humidity,
      wind:data.wind.speed
    });
    console.log(this.state.temp);
    console.log(this.state.condition);
    console.log(this.state.cityName);
    console.log(this.state.humidity);
    console.log(this.state.wind);
  }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const { 
        coords : {latitude ,longitude} 
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude,longitude);
    } catch (error) {
      Alert.alert("위치를 찾을 수 없어요!!", "위치 접근을 허용해 주세요!");
    }
  }

  componentDidMount(){
    this.getLocation();
  }

  render(){
    const {isLoading, temp, condition, cityName, wind, humidity} = this.state;
    return isLoading ? <Loading /> : <Weather 
      temp={Math.round(temp)} 
      condition={condition}
      cityName={cityName}
      wind={wind}
      humidity={humidity}
    />;
  }
}
