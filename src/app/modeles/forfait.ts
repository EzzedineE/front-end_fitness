export class Forfait {
  _id: string;
  titre: string;
  prix: number;
  période: number;
  description: string;
  machine: string;
  createdAt: Date;
  constructor(
    createdAt: Date = new Date(),
    _id: string = '',
    titre: string = '',
    prix: number = 0,
    période: number = 0,
    description: string = '',
    machine: string = ''
  ) {
    (this.createdAt = createdAt), (this.titre = titre), (this.prix = prix);
    (this._id = _id), (this.période = période);
    this.description = description;
    this.machine = machine;
  }
}
