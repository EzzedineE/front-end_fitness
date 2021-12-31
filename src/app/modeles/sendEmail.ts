export class Send {
  object: string;
  message: string;

  constructor(object: string = '', message: string = '') {
    (this.object = object), (this.message = message);
  }
}
