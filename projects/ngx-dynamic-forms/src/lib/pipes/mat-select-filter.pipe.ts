import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'matSelectFilter',
  standalone: false,
})
export class MatSelectFilterPipe implements PipeTransform {

  public transform(items: any[], searchTerm: string, key: string): any[] {
    if (!searchTerm) return items;

    const searchTermLower = searchTerm.toLowerCase();
    let results = items.filter(item => item[key].toLowerCase().includes(searchTermLower));

    if (results.length <= 0) {
      const splitString = searchTerm.split("-", 2);
      results.push({
        [key]: `Voeg: "${splitString[0]?.trim()} - ${splitString[1]?.trim()}" toe`,
        code: splitString[0]?.trim(), systeemOmschrijving: splitString[1]?.trim()
      })
    }

    return results;
  }

}
