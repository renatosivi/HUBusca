import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Keyboard, useWindowDimensions, Dimensions, Touchable } from 'react-native';
import axios from 'axios';
import { FC, useState } from 'react';
import styled from 'styled-components/native';
import React from 'react';
import noImage from '../../assets/images/no-image.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserData } from '../types/types';
import { JSX } from 'react';

type RootStackParamList = {
  Home: {id: 1} | undefined;
  Profile: UserData | undefined;
};

const noImageUri: string = Image.resolveAssetSource(noImage).uri;

const defaultUserData: UserData = {
  // avatar_url: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
  avatar_url: noImageUri,
  // avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/NewTux.svg',
  // avatar_url: 'https://huggingface.co/tasks/assets/image-classification/image-classification-input.jpeg',
  name: '',
  login: '',
  location: '',
  id: 0,
  followers: 0,
  public_repos: 0,
  repos_url: ''
};

export default function Main(): React.JSX.Element {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [inputValue, setInputValue] = useState('');
  const [displayProfile, setDisplayProfile] = useState<'flex' | 'none'>('none');

  const submitValue = async function(): Promise<void> {
    Keyboard.dismiss();
    setDisplayProfile('none');
    setUserData(defaultUserData);

    try {
      const {data}: {data: UserData} = await axios.get(`https://api.github.com/users/${inputValue}`);
      const filteredData: UserData = {
        avatar_url: data.avatar_url,
        name: data.name,
        login: data.login,
        location: data.location,
        id: data.id,
        followers: data.followers,
        public_repos: data.public_repos,
        repos_url: data.repos_url
      };
      setUserData(filteredData);
      setDisplayProfile('flex');
    } catch(error) {
      console.log(error);
    }
  };

  const pushProfile = function(): void {
    navigation.navigate('Profile', userData);
  };

  return (
    <Container>
      <Logo>HUBusca</Logo>
      <View>
        <InputLabel>Digite abaixo o nome de usuário</InputLabel>
        <Form>
          <Input
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={submitValue}
            placeholder='Nome de usuário'
          />
          <Button onPress={submitValue}>
            <Text>Buscar</Text>
          </Button>
        </Form>
      </View>
      <ProfileContainer  style={{display: displayProfile}}>
        {/* {
          userData.avatar_url === '' ? (
            <></>
          ) : (
            <Image source={{uri: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'}}/>
          )
        } */}
        <ImageContainer onPress={pushProfile}>
          <Image source={{uri: userData.avatar_url, width: 100, height: 100}}/>
        </ImageContainer>
        {/* <Image source={{uri: 'https://cdlresende.com.br/wp-content/uploads/2018/03/no-image-icon-4.png', width: 200, height: 200}}/> */}
        <Text>{userData.login}</Text>
        <View>
          <View>
            <Text>Nome</Text>
            <Text>{userData.name}</Text>
          </View>
          <View>
            <Text>Localização</Text>
            <Text>{userData.location}</Text>
          </View> 
        </View>
      </ProfileContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 80px;
  background-color: #FFF;
  align-items: center;
`;

const Logo = styled.Text`
  margin-bottom: 40px;
  font-size: 50px;
`;

const Form = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  column-gap: 10px;
`;

const InputLabel = styled.Text`
  margin-bottom: 5px;
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

const ProfileContainer = styled.View`
  flex: 1;
  width: 350px;
  border: 1px solid black;
  border-radius: 10px;
  align-items: center;
`;

const ImageContainer = styled.Pressable`
  align-items: center;
  justify-content: center;
`;