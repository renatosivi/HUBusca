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

export type Repositories = {
  name: string;
  language: string | null;
  description: string | null;
  created_at: string;
  pushed_at: string;
  html_url: string;
}[];