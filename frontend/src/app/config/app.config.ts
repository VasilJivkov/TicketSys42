export class AppConfig {
  public readonly apiUrl: string;
  public readonly jwtIssuer: string;

  constructor() {
    this.apiUrl = 'http://localhost:8000';
    this.jwtIssuer = 'maniacs';
  }
}
