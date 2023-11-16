import { View, Keyboard, Dimensions, Image, StatusBar } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components/native';
import React from 'react';
import noImage from '../../assets/images/no-image.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, UserData } from '../types/types';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const noImageUri: string = Image.resolveAssetSource(noImage).uri;

const defaultUserData: UserData = {
  avatar_url: noImageUri,
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
  const [inputValue, setInputValue] = useState<string>('');
  const [profileDisplay, setProfileDisplay] = useState<'flex' | 'none'>('none');
  const [history, setHistory] = useState<string[]>([]);
  const [shownHistory, setShownHistory] = useState<boolean>(false);
  const [errorDisplay, setErrorDisplay] = useState<'flex' | 'none'>('none');

  const toggleHistory = function(): void {
    if (history.length === 0) return;
    setShownHistory(!shownHistory);
    setErrorDisplay('none');
  };

  const submitValue = async function(value: string): Promise<void> {
    Keyboard.dismiss();
    setProfileDisplay('none');
    setErrorDisplay('none');
    setShownHistory(false);
    setUserData(defaultUserData);
    if (value === '') return;

    try {
      const {data}: {data: UserData} = await axios.get(`https://api.github.com/users/${value}`);
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
      setProfileDisplay('flex');

      const containsInput: boolean = history.some(currentValue => currentValue === value);
      if (!containsInput) setHistory([value, ...history]);
    } catch {
      setErrorDisplay('flex');
    }
  };

  const pushProfile = function(): void {
    navigation.navigate('Profile', userData);
  };

  return (
    <Container>
      <Header>
        <Logo>HUBusca</Logo>
        <HistoryButton
          style={{
            backgroundColor: shownHistory ? '#373a3e': '#30363D'
          }}
        >
          <MaterialIcons
            name='history'
            size={36}
            color='#7D8590'
            onPress={toggleHistory}
          />
        </HistoryButton>
      </Header>

      <View>
        <InputLabel>Digite abaixo o nome de usuário</InputLabel>
        <Form>
          <Input
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={() => submitValue(inputValue)}
            placeholder='Nome de usuário'
            placeholderTextColor='#8B949E'
          />
          <Button onPress={() => submitValue(inputValue)}>
            <ButtonText>Buscar</ButtonText>
          </Button>
        </Form>
      </View>

      <ErrorMessage style={{display: errorDisplay}}>
        <ErrorText>Nome de usuário inexistente</ErrorText>
        <AntDesign
          name='closecircleo'
          size={24}
          color='#7D8590'
          onPress={() => setErrorDisplay('none')}
        />
      </ErrorMessage>

      <HistoryContainer style={{display: shownHistory ? 'flex' : 'none'}}>
        <History>
          <HistorySubContainer>
            {history.map((value, index) => {
              return (
                <SavedUsernameBox key={index} onPress={() => submitValue(value)}>
                  <SavedUsername>{value}</SavedUsername>
                </SavedUsernameBox>
              );
            })}
          </HistorySubContainer>
        </History>
      </HistoryContainer>

      <ProfileContainer style={{display: profileDisplay}}>
        <ImageContainer onPress={pushProfile}>
          <ImageView>
            <StyledImage source={{uri: userData.avatar_url}}/>
          </ImageView>
          <Username>{userData.login}</Username>
        </ImageContainer>
        <InfosView>
          <Info>
            <TextLabel>Nome</TextLabel>
            <InfoContentView>
              <InfoContent>{userData.name}</InfoContent>
            </InfoContentView>
          </Info>
          <Info>
            <TextLabel>Localização</TextLabel>
            <InfoContentView>
              <InfoContent>{userData.location}</InfoContent>
            </InfoContentView>
          </Info>
        </InfosView>
      </ProfileContainer>
    </Container>
  );
}

const Container = styled.View`
  margin-top: ${() => StatusBar.currentHeight?.toString() + 'px'};
  flex: 1;
  padding: 20px;
  padding-top: 50px;
  align-items: center;
  background-color: #0D1117;
`;

const Header = styled.View`
  width: 100%;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.Text`
  font-size: 50px;
  color: #E6EDF3;
`;

const HistoryButton = styled.Pressable`
  border: 1px solid #8B949E;
  border-radius: 20px;
  padding: 5px;
`;

const Form = styled.View`
  width: ${() => (Dimensions.get('window').width - 40).toString() + 'px'};
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const InputLabel = styled.Text`
  margin-bottom: 5px;
  color: #E6EDF3;
`;

const Input = styled.TextInput`
  width: 275px;
  height: 50px;
  border: 1px solid #8B949E;
  border-radius: 10px;
  padding: 10px;
  color: #E6EDF3;
`;

const Button = styled.Pressable`
  border: 1px solid #8B949E;
  border-radius: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: #30363D;
`;

const ButtonText = styled.Text`
  color: #E6EDF3;
`;

const ErrorMessage = styled.View`
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #8B949E;
  border-radius: 10px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ErrorText = styled.Text`
  color: #E6EDF3;
`;

const HistoryContainer = styled.View`
  width: 100%;
  max-height: 125px;
  border: 1px solid #8B949E;
  border-radius: 10px;
  align-items: center;
  padding: 10px;
`;

const History = styled.ScrollView`
  width: 100%;
`;

const HistorySubContainer = styled.View`
  align-items: center;
  row-gap: 10px;
`;

const SavedUsernameBox = styled.Pressable`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #8B949E;
  border-radius: 5px;
  align-items: center;
  background-color: #30363D;
`;

const SavedUsername = styled.Text`
  color: #E6EDF3;
`;

const ProfileContainer = styled.View`
  margin-top: 10px;
  width: 100%;
  border: 1px solid #8B949E;
  border-radius: 10px;
  padding: 20px;
  row-gap: 15px;
`;

const ImageContainer = styled.Pressable`
  align-items: center;
  row-gap: 8px;
`;

const ImageView = styled.View`
  border: 2px solid #8B949E;
  border-radius: 100px;
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  object-fit: contain;
`;

const Username = styled.Text`
  font-size: 18px;
  color: #E6EDF3;
`;

const InfosView = styled.View`
  row-gap: 10px;
`;

const Info = styled.View`
  flex-direction: row;
  column-gap: 20px;
`;

const TextLabel = styled.Text`
  width: 80px;
  color: #8B949E;
`;

const InfoContentView = styled.View`
  flex: 1;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #8B949E;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #8B949E;
  align-items: center;
`;

const InfoContent = styled.Text`
  color: #E6EDF3;
`;