export class Client {
  constructor(
    public dni: string,
    public firstname: string,
    public lastname: string,
    public address: string,
    public phone: string,
    public email: string,
    public registrationDate: string,
    public id?: number
  ) {}
}