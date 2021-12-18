export class Commentaire {
  _id: string;
  nom: string;
  prenom: string;
  commentaire: string;
  answered: boolean;

  createdAt: Date;
  constructor(
    _id: string = '',
    nom: string = '',
    prenom: string = '',
    commentaire: string = '',
    answered: boolean = false,
    createdAt: Date = new Date()
  ) {
    (this.nom = nom), (this.prenom = prenom);
    (this._id = _id), (this.commentaire = commentaire);
    this.createdAt = createdAt;
    this.answered = answered;
  }
}
