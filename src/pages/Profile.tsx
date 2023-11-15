import { View, Text, Image, ScrollView, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { UserData } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components/native";

type Repositories = {
  name: string;
  language: string | null;
  description: string | null;
  created_at: string;
  pushed_at: string;
  html_url: string;
}[];

export default function Profile(): React.JSX.Element {
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
      console.log(data);
      
      // const {name, language, description, created_at, pushed_at} = data[3];
      // console.log(name, language, description, created_at, pushed_at);
    };
    
    requestRepos();
  }, []);

  const openURL = async function(url: string): Promise<void> {
    await Linking.openURL(url);
  };

  return (
    <Container>
      <View>
        <Image source={{uri: avatar_url}} width={100} height={100}/>
        <Text>{login}</Text>
        <Text>{name}</Text>
        <Text>{location}</Text>
        <Text>{id}</Text>
        <Text>{followers}</Text>
        <Text>{public_repos}</Text>
      </View>
      <RepositoriesContainer>
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
                <Text>{name}</Text>
                <Text>{language}</Text>
                <Text>{description}</Text>
                <Text>{created_at.slice(0, 10)}</Text>
                <Text>{pushed_at.slice(0, 10)}</Text>
              </RepositoryView>
            );
          })}
        </RepositoriesSubContainer>
      </RepositoriesContainer>

    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const RepositoriesContainer = styled.ScrollView`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  /* flex-direction: row; */
  /* display: flex; */
`;

const RepositoriesSubContainer = styled.View`
  margin-bottom: 20px;
  row-gap: 10px;
`;

const RepositoryView = styled.Pressable`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
`;