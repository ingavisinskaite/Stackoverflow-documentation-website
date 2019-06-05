import { TranslationService } from './../services/translation.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate',
        pure: false })

export class TranslatePipe implements PipeTransform {

    constructor(public _trans: TranslationService) { }

    transform(el: string): any {
        this._trans.getLocalStorageLang();
        console.log(el);
        const transArray = Object.keys(this._trans.lang);
        const valueArray = Object.values(this._trans.lang);
        console.log(valueArray);
        console.log(transArray);
        const positionOfElement = transArray.indexOf(el);
        console.log(positionOfElement);
        return valueArray[positionOfElement];
    }
}