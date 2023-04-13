import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuestionarioService } from '../Services/cuestionario.service';
import { LocalStorageService } from '../Services/local-storage.service';

@Component({
  selector: 'app-forms-created',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms-component.css']
})
export class ListFormsComponent {

  // Variables del login
  localStorageData: any = this.localStorage.get('cuenta');
  UID!: string;
  data: any;

  constructor(private navegar: Router, private basededatos: CuestionarioService, private localStorage: LocalStorageService) {
    this.UID = this.localStorageData.user.uid;

    this.basededatos.obtenerData(this.UID).subscribe((respuesta: any) => {
      this.data = respuesta;
    })
   }

  Crear() {
    this.navegar.navigate([`forms/create`]);
  }

  AbrirCuestionario(datos: any) {
    console.log({ datosdelcuestionario: datos });

    if (confirm('Estas seguro que quieres borrar este cuestionario?')) {
      this.basededatos.EliminarData(this.UID, datos.id).then(() => {
        console.log('Datos eliminados correctamente!')
      })
    }
  }

}
