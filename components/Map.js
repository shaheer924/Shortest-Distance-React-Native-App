import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Box, AspectRatio, Image, Modal, Center, Stack, Heading, Text, HStack, Avatar, Button, Input, Spinner, ScrollView, useToast, VStack } from "native-base";
import { Polyline } from "react-native-maps";
import { AnimatedRegion, MarkerAnimated, Animated } from 'react-native-maps';


const Map = ({ route, navigation }) => {
    let { pickup, dropoff, places } = route.params
    const [line, setLine] = useState([])
    const [place, setPlace] = useState([])
    useEffect(() => {
        getShortestPath()
    }, [])
    const getShortestPath = () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch(`https://api.geoapify.com/v1/routing?waypoints=${pickup.coordinates[1]}%2C${pickup.coordinates[0]}%7C${dropoff.coordinates[1]}%2C${dropoff.coordinates[0]}&mode=drive&apiKey=ffd8bbbecc4d415fb754cd5c77963dac`, requestOptions)
            .then(response => response.json())
            .then(result => {
                let lineDirection = []
                result.features[0].geometry.coordinates[0].map(dt => {
                    lineDirection.push({
                        latitude: dt[1],
                        longitude: dt[0]
                    })
                })
                setLine(lineDirection)

            })
            .catch(error => console.log('error', error));

        // fetch(`https://api.geoapify.com/v2/places?categories=gas&filter=rect:${pickup.coordinates[1]},${pickup.coordinates[0]},${dropoff.coordinates[1]},${dropoff.coordinates[0]}&limit=20&apiKey=ffd8bbbecc4d415fb754cd5c77963dac`, requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         let obj = []
        //         console.log(result.length)
        //         result.features.map(dt => {
        //             obj.push({
        //                 coordinates: dt.geometry.coordinates,
        //                 address_1: dt.properties.address_line1,
        //                 address_2: dt.properties.address_line2,
        //                 city: dt.properties.city
        //             })
        //             setPlace(obj)
        //         })
        //     })
        //     .catch(error => console.log('error', error));
    }
    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{ latitude: pickup.coordinates[1] * 1, longitude: pickup.coordinates[0] * 1, latitudeDelta: pickup.coordinates[1] * 0.001, longitudeDelta: pickup.coordinates[0] * 0.001 }}            >
                <Marker
                    coordinate={{ latitude: pickup.coordinates[1] * 1, longitude: pickup.coordinates[0] * 1 }}
                    title={pickup.address}
                    description="Pickup location"
                />
                <Marker
                    coordinate={{ latitude: dropoff.coordinates[1], longitude: dropoff.coordinates[0] }}
                    title={dropoff.address}
                    description="Dropoff location"
                />
                {place.length > 0 && place.map((dt, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{ latitude: dt.coordinates[0], longitude: dt.coordinates[1] }}
                            title={dropoff.address_1}
                            description="Dropoff location"
                        />
                    )
                })}
                <Polyline
                    coordinates={line} //specify our coordinates
                    strokeColor={"green"}
                    strokeWidth={4}
                    lineDashPattern={[0]}
                />
            
            </MapView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Map