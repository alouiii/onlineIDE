export const authConfig = {
  production: false, // Use `true` for production environments
  gitlabUrl: 'https://gitlab.lrz.de',
  gitlabApiUrl: 'https://gitlab.lrz.de/api/v4',
  gitlabClientId:
    '3c320a9378bae7dd876289b05524903b5936ca7b5600d67a9021a409eeda2a36',
  gitlabSecret:
    'gloas-186ddd1cb93d0729f6a3e24843675ace5de758541c3bf766f06c4531d62945c6', // Be cautious with the client secret
  gitlabRedirectUri: 'http://localhost:4200/projects',
};
