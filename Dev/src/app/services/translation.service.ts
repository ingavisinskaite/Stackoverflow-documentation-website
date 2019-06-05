import { Injectable } from '@angular/core';
import { en } from '../../assets/locale/en';
import { lt } from '../../assets/locale/lt';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {


  constructor() {
    this.setDefaultLang();
  }

  private setDefaultLang() {
    if (!this.getLocalStrg()) {
      this.setLocalStrg('EN');
    }
  }

  public setLocalStrg(lang: string): void { // irasiau info i local storage
    return localStorage.setItem('kalba', lang); // 'kalba' - matomas browseryje
  }

  private getLocalStrg(): string { // metodas pasiimti info is local storage
    return localStorage.getItem('kalba');
  }

  public getSelectedLang(): any {
    return this.getLang(this.getLocalStrg());
  }

  private getLang(lang: string): any {
    if (lang === 'LT') {
      return lt;
    } else {
      return en;
    }
  }


}
