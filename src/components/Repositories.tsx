import { Linking } from 'react-native';
import styled from 'styled-components/native';
import React from 'react';
import { RepositoryProps } from '../types/types';

const openURL = async function(url: string): Promise<void> {
  await Linking.openURL(url);
};

export default function Repository({
  name,
  language,
  description,
  created_at,
  pushed_at,
  html_url,
}: RepositoryProps): React.JSX.Element {
  const formattedCreatedAt = created_at.slice(0, 10).split('-').reverse().join('/');
  const formattedPushedAt = pushed_at.slice(0, 10).split('-').reverse().join('/');

  return (
    <RepositoryView onPress={() => openURL(html_url)}>
      <TopFromRepository>
        <RepositoryNameView>
          <RepositoryName>{name}</RepositoryName>
        </RepositoryNameView>
        <RepositoryLangView>
          <RepositoryLang>{language}</RepositoryLang>
        </RepositoryLangView>
      </TopFromRepository>
      <DescriptionView style={{display: description === null ? 'none' : 'flex'}}>
        <Description>{description}</Description>
      </DescriptionView>
      <Dates>
        <DateView>
          <DateLabel>Criado em</DateLabel>
          <DateValue>{formattedCreatedAt}</DateValue>
        </DateView>
        <DateView>
          <DateLabel>Último push em</DateLabel>
          <DateValue>{formattedPushedAt}</DateValue>
        </DateView>
      </Dates>
    </RepositoryView>
  );
}

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
  column-gap: 15px;
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
  color: #c1c6ca;
`;

const DescriptionView = styled.View`
  width: 100%;
`;

const Description = styled.Text`
  color: #c1c6ca;
`;

const Dates = styled.View`
  flex-direction: row;
`;

const DateView = styled.View`
  flex: 1;
`;

const DateLabel = styled.Text`
  color: #8B949E;
`;

const DateValue = styled.Text`
  color: #c1c6ca;
`;