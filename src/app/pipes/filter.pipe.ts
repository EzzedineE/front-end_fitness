import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], chercher: any): any[] {
    return array.filter(
      (element) =>
        element.nom.toLowerCase().includes(chercher.toLowerCase()) ||
        element.facebook.toLowerCase().includes(chercher.toLowerCase()) ||
        element.instagram.toLowerCase().includes(chercher.toLowerCase())
    );
  }
}
