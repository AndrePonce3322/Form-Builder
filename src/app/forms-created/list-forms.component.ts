import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuestionarioService } from '../Services/cuestionario.service';
import { CompartirDataService } from '../Services/compartir-data.service';

@Component({
  selector: 'app-forms-created',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms-component.css']
})
export class ListFormsComponent implements OnInit {

  constructor(private navegar: Router, private recibirUID: CompartirDataService, private basededatos: CuestionarioService) { }

  UID!: string;
  data: any;

  ngOnInit(): void {
    this.recibirUID.share.subscribe((datos: any) => {
      this.UID = datos.user.uid;
    })

    this.basededatos.obtenerData(this.UID).subscribe((respuesta: any) => {
      console.log('Data obtenida:', respuesta);
      this.data = respuesta;
    })
  }

  Crear() {
    this.navegar.navigate([`forms/create`]);
  }

  AbrirCuestionario(datos: any) {
    console.log({ datosdelcuestionario: datos });

    if (confirm('Estas seguro que quieres borrar este cuestionario?')) {
      this.basededatos.EliminarData(this.UID, datos.id).then(()=>{
        console.log('Datos eliminados correctamente!')
      })
    }
  }

}
