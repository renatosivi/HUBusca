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
  Home: undefined;
  Profile: UserData | undefined;
};