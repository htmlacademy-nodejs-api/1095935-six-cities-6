interface IGetMongoURIArgs {
  username: string;
  password: string;
  host: string;
  port: string;
  dbName: string;
}

export const getMongoURI = ({
  username,
  password,
  host,
  port,
  dbName,
}: IGetMongoURIArgs): string =>
  `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
