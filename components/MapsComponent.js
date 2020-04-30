import React from 'react'
import { View, StyleSheet} from 'react-native'
const MapsComponent = ({
    Mapbox,
    gettingUsersRoute,
    longitude,
    coordinates,
    latitude}) => {
    const setPosition = (features) => {
      gettingUsersRoute(features)
    }
    /**
     * various object coordinates need for the 
     * the icons to render
     */
    const  dataSourceSave = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
            properties: {
              icon: 'exampleIcon',
            },
            geometry: {
              type: 'Point',
              coordinates: [32.531333, 0.128424],
            },
          },
          {
            type: 'Feature',
            id: '9d10456e-bdda-4aa9-9269-04c1667d45522',
            properties: {
              icon: 'exampleIcon',
            },
            geometry: {
              type: 'Point',
              coordinates: [32.507702,0.105662],
            },
          },
          {
            type: 'Feature',
            id: '9d10456e-bdda-4aa9-9269-04c1667d45523',
            properties: {
              icon: 'exampleIcon',
            },
            geometry: {
              type: 'Point',
              coordinates: [32.506672, 0.101166],
            },
          },
        ],
      };
    
      /**
       * line generation between the two coordinates
       * 
       */
      const linecoordinates = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates:coordinates
        },
      }
      const pointerAnnotation = dataSourceSave['features'].map((geo)=>(
          <Mapbox.PointAnnotation
          style={styles.annotationContainer}
          key={geo.id}
          id={geo.id}
          title={geo.geometry.type}
          coordinate={geo.geometry.coordinates}
          onSelected={(features)=> setPosition(features)}>
          <View style={styles.annotationContainer}>
             <View style={styles.annotationFill}>
             </View>
          </View>
           <Mapbox.Callout title={geo.id} key={geo.id}/>
          </Mapbox.PointAnnotation>
      ))
    return (
        <View style={styles.container}>
        <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Outdoors}
              attributionEnabled={true}
              logoEnabled={true}
              showUserLocation={true}
              ref={c=>(_map=c)}
              style={styles.map}
              >
              <Mapbox.Camera
                zoomLevel={13}
                animationMode={'flyTo'}
                animationDuration={0}
                centerCoordinate={[longitude,latitude]}
                followUserLocation={true}
                followUserMode={'normal'}
                ref={c=>(camera=c)}
              >
              </Mapbox.Camera>
              <Mapbox.UserLocation/>
                {pointerAnnotation}
                <Mapbox.ShapeSource id='line1' shape={linecoordinates}>
                   <Mapbox.LineLayer id='linelayer1' style={{lineColor:'#c70039', lineWidth:4}} />
              </Mapbox.ShapeSource>
            </Mapbox.MapView>
        </View>
    )
}

export default MapsComponent

const styles = StyleSheet.create({
    container: {
        flex:1,
       
	},
	map: {
		height: 1500,
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white',
		borderRadius: 15
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'orange',
		transform: [{ scale: 0.6 }]
	}
})
