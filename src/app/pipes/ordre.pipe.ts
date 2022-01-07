import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordre',
})
export class OrdrePipe implements PipeTransform {
  transform(array: any[]): any[] {
    array.sort((a: any, b: any) => {
      if (a.moyenne < b.moyenne) {
        return 1;
      } else if (a.moyenne > b.moyenne) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
