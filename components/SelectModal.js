import React, { useState } from 'react';
import { NativeBaseProvider, Box, AspectRatio, Image, Modal, Center, Stack, Heading, Text, HStack, Avatar, Button, Input, Spinner, ScrollView, useToast, VStack } from "native-base";

const SelectModal = ({ modalVisible, setModalVisible, data, setValue, setdata }) => {
    const getValue = (data) => {
        setValue(data)
        setModalVisible(false)
        setdata([])
    }
    return (
        <ScrollView>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
                <Modal.Content>
                    <Modal.Header>Select Location</Modal.Header>
                    <Modal.Body>
                        <Box>
                            {data.map(dt => {
                                return (<Button onPress={(e)=>getValue(dt)}>{dt.address}</Button>)
                            })}
                        </Box>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </ScrollView>
    )
}

export default SelectModal