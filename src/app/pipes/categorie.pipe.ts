import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorie',
})
export class CategoriePipe implements PipeTransform {
  transform(array: any[], categorie: any): any[] {
    return array.filter((element) =>
      element.categorie.toLowerCase().includes(categorie)
    );
  }
}
