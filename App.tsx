import { StatusBar } from 'expo-status-bar';
import { GestureResponderEvent, NativeSyntheticEvent, Text, TextInputChangeEventData} from 'react-native';
import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components/native';

type BasicUserData = {
  avatar_url: String,
  name: String,
  login: String,
  location: String
}

export default function App() {
  const [userData, setUserData] = useState({});
  const [inputValue, setInputValue] = useState('');

  // useEffect(() => {
  //   const getUser = async function(username: String): Promise<BasicUserData | undefined> {
  //     try {
  //       const response = await axios.get(`https://api.github.com/users/${username}`);
  //       const {avatar_url, name, login, location} = response.data;
  //       const data: BasicUserData = {avatar_url, name, login, location};
  //       return data;
  //     } catch(error) {
  //       console.error(error);
  //     }
  //   };
    
  //   const request = async function(): Promise<void> {
  //     const data: BasicUserData | undefined = await getUser('renatosivi');
  //     if(data === undefined) return;
  //     setUserData(data);
  //   };

  //   request();
  // }, []);
  
  // const onChangeValue = function(e: NativeSyntheticEvent<TextInputChangeEventData>) {
  //   const {text}: {text: SetStateAction<string>} = e.nativeEvent;
  //   setInputValue(text);
  // };

  const onSubmitValue = async function() {
    console.log(inputValue);
    try {
      const response = await axios.get(`https://api.github.com/users/${inputValue}`);
      const {avatar_url, name, login, location} = response.data;
      const data: BasicUserData = {avatar_url, name, login, location};
      setUserData(data);
      console.log(data);
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <Text>HUBusca</Text>
      <Form>
        <Input
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={onSubmitValue}
        />
        <Button onPress={onSubmitValue}>
          <Text>Search</Text>
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
`;

const Form = styled.View`
  flex-direction: row;
  column-gap: 10px;
`;

const Input = styled.TextInput`
  width: 270px;
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
`;

const Button = styled.Pressable`
  width: fit-content;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;