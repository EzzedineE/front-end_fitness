export class User {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adress: string;
  date: Date;

  constructor(
    nom: string = '',
    prenom: string = '',
    email: string = '',
    password: string = '',
    adress: string = '',
    date: Date
  ) {
    (this.nom = nom),
      (this.prenom = prenom),
      (this.email = email),
      (this.password = password),
      (this.adress = adress),
      (this.date = date);
  }
}
