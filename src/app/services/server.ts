export class Server{
   private _Url = 'http://localhost:8080';

  constructor(Url: string) {
    this._Url = Url;
  }

   get Url(): string {
    return this._Url;
  }

  set Url(value: string) {
    this._Url = value;
  }
}
