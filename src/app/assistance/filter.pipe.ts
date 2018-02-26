import { Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], term): any {
      return term
          ? items.filter(item => item.title.indexOf(term) !== -1)
          : items;
    }
}
