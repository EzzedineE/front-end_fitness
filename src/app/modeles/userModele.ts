export class User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adress: string;
  date: Date;
  role: string;

  constructor(
    _id: string = '',
    nom: string = '',
    prenom: string = '',
    email: string = '',
    password: string = '',
    adress: string = '',
    date: Date,
    role: string = 'user'
  ) {
    (this._id = _id),
      (this.nom = nom),
      (this.prenom = prenom),
      (this.email = email),
      (this.password = password),
      (this.adress = adress),
      (this.date = date),
      (this.role = role);
  }
}
