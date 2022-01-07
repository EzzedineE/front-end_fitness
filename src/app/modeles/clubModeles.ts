export class Club {
  _id: string;
  nom: string;
  description: string;
  images: string;
  address: string;
  facebook: string;
  instagram: string;
  email: string;
  tel: number;
  cours: [];
  ouverture: Date;
  fermiture: Date;
  ouvertureWeekend: Date;
  fermitureWeekend: Date;
  likes: number;
  constructor(
    _id: string = '',
    nom: string = '',
    description: string = '',
    images: string = '',
    address: string = '',
    facebook: string = '',
    instagram: string = '',
    email: string = '',
    tel: number = 0,
    cours: [] = [],
    ouverture: Date = new Date(),
    fermiture: Date = new Date(),
    ouvertureWeekend: Date = new Date(),
    fermitureWeekend: Date = new Date(),
    likes: number = 0
  ) {
    (this.nom = nom), (this.description = description);
    (this._id = _id),
      (this.images = images),
      (this.address = address),
      (this.facebook = facebook),
      (this.instagram = instagram),
      (this.email = email),
      (this.tel = tel),
      (this.cours = cours),
      (this.ouverture = ouverture),
      (this.fermiture = fermiture),
      (this.ouvertureWeekend = ouvertureWeekend),
      (this.fermitureWeekend = fermitureWeekend),
      (this.likes = likes);
  }
}
