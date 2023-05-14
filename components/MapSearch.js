import React, { useState } from 'react';

import { Box, HStack, VStack, Badge, Button, Avatar, Input, Spinner, ScrollView, useToast, Heading } from "native-base";
import SelectModal from './SelectModal';
;
import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';



const APIKEY = "ffd8bbbecc4d415fb754cd5c77963dac"
const MapSearch = ({ navigation }) => {

    const [groupValues, setGroupValues] = React.useState([]);

    const toast = useToast();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalpickup, setmodalpickup] = React.useState(false);


    const [search, set_search] = useState('')
    const [data, setdata] = useState([])

    const [pickup, setPickup] = useState('')
    const [dropoff, setdropoff] = useState('')
    const [hospital, sethospital] = useState(false);
    const [petrol, setpetrol] = useState(false);
    const [cafe, setcafe] = useState(false);
    const [places, setplace] = useState({
        hospital: false,
        cafe: false,
        petrol: false
    });

    const find = async () => {
        if (search.length < 3) {
            toast.show({ description: "Please enter a place with length greater than 3" })
            return 0
        }
        setModalVisible(!modalVisible);
        var requestOptions = {
            method: 'GET',
        };

        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=${APIKEY}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                let values = []
                result.features.map(dt => {
                    values.push({
                        coordinates: dt.geometry.coordinates,
                        address: dt.properties.address_line1
                    })
                })
                setdata(values)
            })
            .catch(error => console.log('error', error));

    }

    const findDropOff = async () => {
        if (search.length < 3) {
            toast.show({ description: "Please enter a place with length greater than 3" })
            return 0
        }
        setmodalpickup(!modalpickup);
        var requestOptions = {
            method: 'GET',
        };

        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=${APIKEY}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                let values = []
                result.features.map(dt => {
                    values.push({
                        coordinates: dt.geometry.coordinates,
                        address: dt.properties.address_line1
                    })
                })
                setdata(values)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(()=> {
        setplace({...places, hospital: hospital, petrol: petrol, cafe: cafe})
    }, [hospital,petrol, cafe ])

    return (
        <ScrollView>
            <SelectModal data={data} modalVisible={modalVisible} setModalVisible={setModalVisible} setValue={setPickup} setdata={setdata} />
            <SelectModal data={data} modalVisible={modalpickup} setModalVisible={setmodalpickup} setValue={setdropoff} setdata={setdata} />

            <Box>
                <Avatar mt={"5"} bg="green.500" alignSelf="center" size="xl" source={{
                    uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }} />
            </Box>
            <Box>
                <Heading mt={"2"} ml={"2/6"} alignItems={"center"}>Mr. Hassam</Heading>
            </Box>
            <Box>
                <Button mt="2" ml={"5"} mr={"5"} onPress={(e)=>{
                    navigation.navigate('/History')
                }}>See History</Button>
            </Box>

            <Box>
                <HStack w={"full"}>
                    <Box alignItems="center" w={"4/6"} mt="5" mb="25" ml="5" mr="5">
                        <Input mx="3" placeholder="Pickup location" w="100%" onChangeText={(e => set_search(e))} />
                    </Box>
                    <Button onPress={find} mt={"5"} h={"10"}>Search</Button>
                </HStack>

                <HStack w={"full"}>
                    <Box alignItems="center" w={"4/6"} mb="25" ml="5" mr="5">
                        <Input mx="3" placeholder="Dropoff location" w="100%" onChangeText={(e => set_search(e))} />
                    </Box>
                    <Button onPress={findDropOff} h={"10"}>Search</Button>
                </HStack>
            </Box>
            <HStack ml="5" mr="5" space={6}>
                {/* <Checkbox.Group onChange={(e)=>console.log(e)} accessibilityLabel="choose numbers">
                    <Checkbox value="one" my={2}>Fuel Stations</Checkbox>
                    <Checkbox value="two" my={2}>Hospitals/Clinics</Checkbox>
                    <Checkbox value="three" my={2}>Cafe/Resturants</Checkbox>
                </Checkbox.Group> */}
                <View style={styles.section}>
                    <VStack mr="5" mb="5" space={6}>
                        <Box>
                            <HStack>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={hospital}
                                    onValueChange={sethospital}
                                    color={hospital ? '#4630EB' : undefined}
                                />
                                <Text style={styles.paragraph}>Hospitals</Text>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={petrol}
                                    onValueChange={setpetrol}
                                    color={petrol ? '#4630EB' : undefined}
                                />
                                <Text style={styles.paragraph}>Petrol Pumps</Text>
                            </HStack>

                        </Box>
                        <Box>
                            <HStack>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={cafe}
                                    onValueChange={setcafe}
                                    color={cafe ? '#4630EB' : undefined}
                                />
                                <Text style={styles.paragraph}>Cafe/Resturants</Text>
                            </HStack>

                        </Box>
                    </VStack>
                </View>



            </HStack>
            <Button ml="5" mr="5" onPress={(e) => {
                navigation.navigate("/Map", {
                    pickup,
                    dropoff,
                    places
                })
            }}>Go</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        marginRight: 5,
    },
});

export default MapSearch