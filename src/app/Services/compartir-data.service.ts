import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CompartirDataService {

  share = new BehaviorSubject<any>('');

  constructor() { }

  EnviarData(datos: any) {
    return this.share.next(datos);
  }

  RecibirDatos() {
    return this.share.subscribe(() =>{})
  }

}
