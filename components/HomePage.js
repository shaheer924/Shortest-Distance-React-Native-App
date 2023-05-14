import React, { useState } from 'react';
import { NativeBaseProvider, Box, AspectRatio, Image, Modal, Center, Stack, Heading, Text, HStack, Avatar, Button, Input, Spinner, ScrollView, useToast, VStack } from "native-base";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import Map from './Map'

const data = [
    {
        image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        heading: "From Karachi to Hyderabad",
        location: "Karachi",
        distance: 500,
        locationObj: {
            latitude: 24.8607,
            longitude: 67.0011,
            latitudeDelta: 0.02486,
            longitudeDelta: 0.06700,
        }
    },
    {
        image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        heading: "From Karachi to Sialkot",
        location: "Hyderabad",
        distance: 438,
        locationObj: {
            latitude: 17.3850,
            longitude: 78.4867,
            latitudeDelta: 0.0173850,
            longitudeDelta: 0.0784867,
        }
    },
    {
        image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        heading: "From Karachi to Islamabad",
        location: "Sialkot",
        distance: 234,
        locationObj: {
            latitude: 32.4945,
            longitude: 74.5229,
            latitudeDelta: 0.0324945,
            longitudeDelta: 0.0745229,
        }
    },
    {
        image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        heading: "From Karachi to Lahore",
        location: "Peshawar",
        distance: 289,
        locationObj: {
            latitude: 34.0151,
            longitude: 71.5249,
            latitudeDelta: 0.0340151,
            longitudeDelta: 0.0715249,
        }
    }
]

const HomePage = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);

    const OpenMap = (data) => {
        navigation.navigate("/Map", {
            locationObj: data
        })
    }

    return (
        <ScrollView>
            <VStack space={4} mt={"25"} >
                {data.map((dt, index) => {
                    return (
                        <HStack key={index} alignItems={"flex-start"} space={2} mt="3" mr={"3"} ml="2" mb="0.5" bg="white" rounded="md" shadow={3}>
                            <Avatar mt={"1"} ml={"1"} mb={"1"} bg="green.500" source={{
                                uri: dt.image
                            }}>
                                AJ
                            </Avatar>
                            <VStack>
                                <Heading mt={"2"} size={"sm"} alignItems={"center"}>{dt.heading}</Heading>
                                <Box>{"Distance : " + dt.distance + " KM"}</Box>
                            </VStack>
                        </HStack>
                    )
                })}
            </VStack>


        </ScrollView>
    )
}



export default HomePage