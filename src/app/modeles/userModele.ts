export class User {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public nom: string,
    public prenom: string,
    public email: string,
    public password: string,
    public adress: string,
    public date: Date,
    public role: string,
    public nomClub: string,
    public nomForfait: string,
    public prixForfait: number,
    public dateInscription: Date,
    public aimer: boolean
  ) {}
}
