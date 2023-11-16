import { View, Text, ScrollView, Linking, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList, UserData } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { Repositories } from "../types/types";

export default function Profile(): React.JSX.Element {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {avatar_url, followers, id, location, login, name, public_repos, repos_url} = params as UserData;
  const [repositories, setRepositories] = useState<Repositories>([]);

  useEffect(() => {
    const getRepos = async function(repos_url: string): Promise<Repositories | undefined> {
      try {
        const {data}: {data: Repositories} = await axios.get(repos_url);
        return data;
      } catch (error) {
        console.log(error);  
      }
    };

    const requestRepos = async function() {
      const data: Repositories | undefined = await getRepos(repos_url);
      if (data === undefined) {
        console.log(data);
        return;
      }
      setRepositories(data);
    };
    
    requestRepos();
  }, []);

  const goBack = function() {
    navigation.goBack();
  };

  const openURL = async function(url: string): Promise<void> {
    await Linking.openURL(url);
  };

  return (
    <Container>
      <ProfileContainer>
        <BackButton onPress={goBack}>
          <Ionicons
            name='chevron-back'
            size={32}
            color='#7D8590'
          />
        </BackButton>
        <ImageContainer>
          <ImageView>
            <StyledImage source={{uri: avatar_url}}/>
          </ImageView>
          <Username>{login}</Username>
        </ImageContainer>
        <InfosView>
          <Info>
            <TextLabel>Nome</TextLabel>
            <InfoContentView>
              <InfoContent>{name}</InfoContent>
            </InfoContentView>
          </Info>
          <Info>
            <TextLabel>Localização</TextLabel>
            <InfoContentView>
              <InfoContent>{location}</InfoContent>
            </InfoContentView>
          </Info>
        </InfosView>
      </ProfileContainer>

      <RepositoriesContainer>
        <RepositoriesLabel>Repositórios</RepositoriesLabel>
        <ScrollView>
          <RepositoriesSubContainer>
            {repositories.map(({
              name,
              language,
              description,
              created_at,
              pushed_at,
              html_url,
            }, index) => {
              return (
                <RepositoryView key={index} onPress={() => openURL(html_url)}>
                  <TopFromRepository>
                    <RepositoryNameView>
                      <RepositoryName>{name}</RepositoryName>
                    </RepositoryNameView>
                    <RepositoryLangView>
                      <RepositoryLang>{language}</RepositoryLang>
                    </RepositoryLangView>
                  </TopFromRepository>
                  <Description>
                    <Text>{description}</Text>
                  </Description>
                  <Dates>
                    <Text>{created_at.slice(0, 10)}</Text>
                    <Text>{pushed_at.slice(0, 10)}</Text>
                  </Dates>
                </RepositoryView>
              );
            })}
          </RepositoriesSubContainer>
        </ScrollView>
      </RepositoriesContainer>          
    </Container>
  );
}

const Container = styled.View`
  margin-top: ${() => StatusBar.currentHeight?.toString() + 'px'};
  flex: 1;
  padding: 20px;
  row-gap: 20px;
  background-color: #0D1117;
`;

const ProfileContainer = styled.View`
  position: relative;
  margin-top: 10px;
  width: 100%;
  row-gap: 20px;
`;

const BackButton = styled.Pressable`
  position: absolute;
  z-index: 1;
  border: 1px solid #8B949E;
  border-radius: 20px;
  padding: 5px;
  background-color: #30363D;
`;

const ImageContainer = styled.Pressable`
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
`;

const ImageView = styled.View`
  border: 1px solid #8B949E;
  border-radius: 100px;
`;

const StyledImage = styled.Image`
  width: 150px;
  height: 150px;
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

const RepositoriesContainer = styled.View`
  flex: 2;
  height: 100%;
  border: 1px solid #8B949E;
  border-radius: 10px;
  padding: 10px;
  row-gap: 10px;
`;

const RepositoriesLabel = styled.Text`
  color: #E6EDF3;
`;

const RepositoriesSubContainer = styled.View`
  flex-direction: column;
  row-gap: 10px;
`;

const RepositoryView = styled.Pressable`
  border: 1px solid #8B949E;
  border-radius: 10px;
  padding: 10px;
  background-color: #30363D;
  row-gap: 5px;
`;

const TopFromRepository = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RepositoryNameView = styled.Text`
  flex: 2;
`;

const RepositoryName = styled.Text`
  font-size: 16px;
  color: #E6EDF3;
`;

const RepositoryLangView = styled.View`
  flex: 1;
`;

const RepositoryLang = styled.Text`
  color: #E6EDF3;
`;

const Description = styled.View`

`;

const Dates = styled.View`
  flex-direction: row;
`;