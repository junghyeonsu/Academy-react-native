import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import propTypes from 'prop-types'; //타입확인
import { LinearGradient } from 'expo-linear-gradient'; //배경색
import {MaterialCommunityIcons} from '@expo/vector-icons'; //아이콘들

// 날씨에 따라 색상과 아이콘 바꾸기
const weatherOptions = {
    Haze : {
        iconName : "weather-hail",
        gradient : [], //생략
    },

    Clear : {
        iconName : "weather-sunny",
        gradient : [], //생략
    },

    Clouds : {
        iconName : "weather-cloudy",
        gradient : [], //생략
    },

    Thunderstorm : {
        iconName : '', //생략
        gradient : [], //생략
    },

    Drizzle : {
        iconName : '', //생략
        gradient : [], //생략
    },

    Rain : {
        iconName : '', //생략
        gradient : [], //생략
    },

    Snow : {
        iconName : '', //생략
        gradient : [], //생략
    },

    Atmosphere : {
        iconName : '', //생략
        gradient : [], //생략
    },

    Dust :{
        iconName : '', //생략
        gradient : [], //생략
    },

    Mist : {
        iconName : '', //생략
        gradient : [], //생략
    }
}
 
export default function Weather ({temp,condition,wind,humidity,cityName}) {
    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}>
                <StatusBar barStyle="white-content" />
                <View style={styles.halfView}>
                    <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={89} color="white"/>
                    <Text style={styles.temp}>{temp}도</Text>
                </View> 
                <View style={styles.halfView}>
                    <Text style={styles.temp}>{wind}m/s</Text>
                    <Text style={styles.text}>{windText({wind})}</Text>
                </View> 
                <View style={styles.halfView}>
                    <Text style={styles.temp}>습도 {humidity}%</Text>
                    <Text style={styles.text}>{humidityText({humidity})}</Text>
               </View> 
               <View style={styles.halfView}>
                    <Text style={styles.temp}>{cityName}</Text>
               </View> 
        </LinearGradient>    
    );

    // 바람에 따라 텍스트 바꾸기
    function windText(data){
        if(data.wind > 0){
            return '바람이 많이 부네요?';
        } else {
            return '바람이 적게 부네요?';
        }
    }

    // 습도에 따라 텍스트 바꾸기
    function humidityText(data){
        if(data.humidity > 40){
            return '습도가 높아요';
        } else {
            return '습도가 낮아요';
        }
    }
}



Weather.propTypes = {
    temp : propTypes.number.isRequired,
    wind : propTypes.number.isRequired,
    humidity : propTypes.number.isRequired,
    cityName : propTypes.string.isRequired,
    condition : propTypes.oneOf([
        "Thunderstorm",
        "Drizzle",
        "Rain",
        "Snow",
        "Atmosphere",
        "Clear",
        "Clouds",
        "Haze",
        "Dust",
        "Mist"
    ]),
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
    temp : {
        fontSize:32,
        color:"white"
    },
    halfView : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
    text : {
        fontSize : 15,
        color: 'white',
        fontWeight : "200"
    }
})