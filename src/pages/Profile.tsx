import { ScrollView, Linking, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserData } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { RepositoryType } from "../types/types";
import Repository from "../components/Repositories";

export default function Profile(): React.JSX.Element {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {avatar_url, followers, id, location, login, name, public_repos, repos_url} = params as UserData;
  const [repositories, setRepositories] = useState<RepositoryType[]>([]);

  useEffect(() => {
    const getRepos = async function(repos_url: string): Promise<RepositoryType[] | undefined> {
      try {
        const {data}: {data: RepositoryType[]} = await axios.get(repos_url);
        return data;
      } catch (error) {
        console.log(error);  
      }
    };

    const requestRepos = async function() {
      const data: RepositoryType[] | undefined = await getRepos(repos_url);
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

  return (
    <Container>
      <ProfileContainer>
        <BackButton onPress={goBack}>
          <Ionicons name='chevron-back' size={32} color='#7D8590'/>
        </BackButton>
        <ImageContainer>
          <ImageView>
            <StyledImage source={{uri: avatar_url}}/>
          </ImageView>
          <MainInfos>
            <Username>{login}</Username>
            <IDView>
              <IDLabel>ID</IDLabel>
              <ID>{id}</ID>
            </IDView>
          </MainInfos>
        </ImageContainer>
        <InfosView>
          <FollowersView>
            <Followers>{followers}</Followers>
            <FollowersLabel>seguidores</FollowersLabel>
          </FollowersView>
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
        <HeaderRepositories>
          <RepositoriesLabel>Repositórios</RepositoriesLabel>
          <RepositoriesNumber>{public_repos}</RepositoriesNumber>
        </HeaderRepositories>
        <ScrollView>
          <RepositoriesSubContainer>
            {repositories.map((value, index) => <Repository {...value} key={index}/>)}
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
  row-gap: 15px;
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
  align-items: center;
  row-gap: 8px;
`;

const ImageView = styled.View`
  border: 2px solid #8B949E;
  border-radius: 100px;
`;

const StyledImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  object-fit: contain;
`;

const MainInfos = styled.View`
  width: 100%;
  align-items: center;
`;

const Username = styled.Text`
  font-size: 18px;
  color: #E6EDF3;
`;

const IDView = styled.View`
  flex-direction: row;
  column-gap: 5px;
`;

const IDLabel = styled.Text`
  color: #8B949E;
`;

const ID = styled.Text`
  color: #E6EDF3;
`;

const InfosView = styled.View`
  row-gap: 10px;
`;

const FollowersView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  column-gap: 5px;
`;

const Followers = styled.Text`
  color: #E6EDF3;
`;

const FollowersLabel = styled.Text`
  color: #8B949E;
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

const HeaderRepositories = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const RepositoriesLabel = styled.Text`
  color: #8B949E;
`;

const RepositoriesNumber = styled.Text`
  text-decoration: underline;
  color: #E6EDF3;
`;

const RepositoriesSubContainer = styled.View`
  flex-direction: column;
  row-gap: 10px;
`;