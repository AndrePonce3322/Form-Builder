import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { DatosDeUsuario } from '../datos-de-usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  constructor(private firestore: Firestore) { }

  enviarMensaje(datos: DatosDeUsuario, uid: string) {
    const ref = collection(this.firestore, uid);
    return addDoc(ref, datos);
  }

  obtenerMensaje(uid: string): Observable<DatosDeUsuario[]>{ 
    const ref = collection(this.firestore, uid);
    return collectionData(ref, {idField: 'id'}) as Observable<DatosDeUsuario[]>;
  }

}
