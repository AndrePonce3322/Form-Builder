import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc} from '@angular/fire/firestore';
import { CompartirDataService } from './compartir-data.service';


@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  constructor(private firestore: Firestore, private recibirID: CompartirDataService) { }

  enviarData(datos: any, uid: string) {
    const ref = collection(this.firestore, uid);
    return addDoc(ref, datos);
  }

  obtenerData(uid: string){ 
    const ref = collection(this.firestore, uid);
    return collectionData(ref, {idField: 'id'});
  }

  EliminarData(uid: string, id: string){
    const referencia = doc(this.firestore, `${uid}/${id}`);
    
    return deleteDoc(referencia);

  }

}
