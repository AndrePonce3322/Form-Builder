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
    this.navegar.navigate([`forms/create/${this.GenerarCodigo()}`]);
  }

  GenerarCodigo() {
    let codigo = '';
    const caracteres = 'ab__cde+$1f_65684++ghi&j323k++lmnopq2$_&iminthespace mi bro34s123rst_8uvwxyz';

    for (let i = 0; i < 25; i++) {
      codigo += caracteres[Math.round(Math.random() * caracteres.length)];
    }

    return codigo
  }

}
