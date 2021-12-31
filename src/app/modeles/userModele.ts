export class User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adress: string;
  date: Date;
  role: string;
  nomClub: string;
  nomForfait: string;
  prixForfait: number;
  dateInscription: Date;
  aimer: boolean;

  constructor(
    _id: string = '',
    nom: string = '',
    prenom: string = '',
    email: string = '',
    password: string = '',
    adress: string = '',
    date: Date,
    role: string = 'admin',
    nomClub: string = '',
    nomForfait: string = '',
    prixForfait: number = 0,
    dateInscription: Date = new Date(),
    aimer: boolean = false
  ) {
    (this._id = _id),
      (this.nom = nom),
      (this.prenom = prenom),
      (this.email = email),
      (this.password = password),
      (this.adress = adress),
      (this.date = date),
      (this.role = role),
      (this.aimer = aimer),
      (this.nomClub = nomClub),
      (this.nomForfait = nomForfait),
      (this.dateInscription = dateInscription),
      (this.prixForfait = prixForfait);
  }
}
