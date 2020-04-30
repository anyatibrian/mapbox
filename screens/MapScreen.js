import React, {
useEffect,
useState
} from "react";
import {
  View,
  Platform
} from "react-native";
import Mapbox from "@react-native-mapbox-gl/maps";
import Geolocation from '@react-native-community/geolocation'
import MapsComponent from '../components/MapsComponent'
import axios from 'axios'

Mapbox.setAccessToken('pk.eyJ1IjoiYW55YXRpYnJpYW4iLCJhIjoiY2s1cGdrN3Y2MHNqbjNobW80eXF2MHAwNyJ9.3valCGJERUuqC_EqTY-E1Q')
const  MapScreen =()=> {

  const [currentUserLocation, setCurrentUserLocation] = useState({latitude:null, longitude:null})
  const [coordinates, setCoordinates] = useState([])
  /**
   * 
   * implementing the react componentDid Mount life cycle methods 
   * 
   */
  useEffect(()=>{
    requestPermission()
    getCurrentUserLocation()
  }, [currentUserLocation,coordinates])
  //requesting permissions to access users current positons
  requestPermission = async () => {
    try {
      if(Platform.OS==='ios'|| Platform.OS==="web"){
        return true
      }else{
        const isGranted =  await Mapbox.requestAndroidLocationPermissions()
        if(isGranted){
          return true
        }else{
          return false
        }
      }
    } catch (error) {
      console.warn(error)
    }
  }
  /**
   * get current user locations
   */

  getCurrentUserLocation = () => {
    Geolocation.getCurrentPosition(({
        coords
      }) => {
       setCurrentUserLocation({...setCurrentUserLocation, latitude:coords.latitude, longitude:coords.longitude})
      },
      error => console.log(error), {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 20000
      }
    )
  }
  /**
   * function that shows routs between two places when 
   * some one clicks on the maker
   */
  gettingUsersRoute = async(features) => {
    const {latitude, longitude} = currentUserLocation
    const {geometry:{coordinates}} =features
    //making axios calls to the mapbox direction api
    try {
      const response = await axios({
        method:'GET',
        url:`https://api.mapbox.com/directions/v5/mapbox/walking/${longitude.toFixed(6)},${latitude.toFixed(6)};${coordinates[0]},${coordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiYW55YXRpYnJpYW4iLCJhIjoiY2s1cGdrN3Y2MHNqbjNobW80eXF2MHAwNyJ9.3valCGJERUuqC_EqTY-E1Q`
      })
      setCoordinates(response.data.routes[0]['geometry']['coordinates'])
    } catch (error) {
      console.log(error)
    }
  }
    return ( <View >
      <MapsComponent 
        Mapbox={Mapbox}
        latitude={currentUserLocation.latitude}
        longitude={currentUserLocation.longitude}
        coordinates={coordinates}
        gettingUsersRoute={gettingUsersRoute}/> 
      </View>
      );
    }

  export default MapScreen