import { View } from "react-native";

export type UserData = {
  avatar_url: string,
  name: string | null,
  login: string,
  location: string | null,
  id: number,
  followers: number,
  public_repos: number,
  repos_url: string
};

export type RootStackParamList = {
  Profile: UserData | undefined;
};

export type RepositoryType = {
  name: string;
  language: string | null;
  description: string | null;
  created_at: string;
  pushed_at: string;
  html_url: string;
};

export type RepositoryProps = View['props'] & RepositoryType;