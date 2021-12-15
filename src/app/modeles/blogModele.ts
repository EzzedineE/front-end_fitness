export class Blog {
  _id: string;
  titre: string;
  description: string;
  images: string;
  createdAt: Date;
  constructor(
    _id: string = '',
    titre: string = '',
    description: string = '',
    images: string = '',
    createdAt: Date = new Date()
  ) {
    (this.titre = titre), (this.description = description);
    (this._id = _id), (this.images = images);
    this.createdAt = createdAt;
  }
}
