interface IGetMongoURIArgs {
  username: string;
  password: string;
  host: string;
  port: string;
  dbName: string;
}

export function getMongoURI({
  username,
  password,
  host,
  port,
  dbName,
}: IGetMongoURIArgs): string {
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
}
