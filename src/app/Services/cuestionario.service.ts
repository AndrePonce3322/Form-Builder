import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  constructor(private firestore: Firestore) { }

  enviarData(datos: any, uid: string) {
    const ref = collection(this.firestore, uid);
    return addDoc(ref, datos);
  }

  obtenerData(uid: string){ 
    const ref = collection(this.firestore, uid);
    return collectionData(ref, {idField: 'id'});
  }

}
