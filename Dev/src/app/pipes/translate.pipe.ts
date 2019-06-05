import { TranslationService } from './../services/translation.service';
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'translate' })

export class TranslatePipe implements PipeTransform {

    constructor(public _trans: TranslationService) { }

    transform(el: string): any {
        console.log(el);
        let transArray = Object.keys(this._trans.lang);
        let valueArray = Object.values(this._trans.lang);
        console.log(valueArray);
        console.log(transArray);
        let positionOfElement = transArray.indexOf(el);
        console.log(positionOfElement);
        return valueArray[positionOfElement];
    }
}