import React, { useState } from 'react';
import { NativeBaseProvider, Box, AspectRatio, Image, Center, Stack, Heading, Text, HStack, Button, Input, Spinner, ScrollView, useToast } from "native-base";

const LoginPage = ({ navigation }) => {
  const toast = useToast();
  // state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false)
  // navigation.pop()

  // handle login button press
  const handleLogin = () => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
      toast.show({
        description: "Login successfull"
      })
      navigation.push('Map Search', { owner: email });
    }, 2000)
  }

  return (
    <ScrollView>
      <Box alignItems="center" marginTop={"2/5"}>
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }} _web={{
          shadow: 2,
          borderWidth: 0
        }} _light={{
          backgroundColor: "gray.50"
        }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              {/* <Image source={{
              uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
            }} alt="image" /> */}
              <Box>
                <Heading size="md" ml="25" mr="25" mt="55" textAlign={"center"}>
                  Please enter your account details to login
                </Heading>
              </Box>
            </AspectRatio>
          </Box>
          <Box alignItems="center" mb="25" ml="5" mr="5">
            <Input mx="3" placeholder="Enter your name or email" w="100%" disabled={disabled} onChangeText={(e => setEmail(e))} />
          </Box>
          <Box alignItems="center" mb="25" ml="5" mr="5">
            <Input mx="3" placeholder="Enter your password" w="100%" type='password' disabled={disabled} onChangeText={(e => setPassword(e))} />
          </Box>
          <Box alignItems="center" mb="25">
            <Button disabled={disabled} onPress={handleLogin}>{disabled == true ? <Spinner color="emerald.500" /> : "Login"}</Button>
          </Box>
          <Box alignItems="center" mb="25">
            <Button disabled={disabled} onPress={()=>navigation.push('Sign Up')}>Create your account</Button>
          </Box>          
        </Box>
      </Box>
    </ScrollView>
  );
}

export default LoginPage