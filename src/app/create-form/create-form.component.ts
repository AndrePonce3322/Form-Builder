import { Component, OnInit } from '@angular/core';
import { CompartirDataService } from '../Services/compartir-data.service';
import { CuestionarioService } from '../Services/cuestionario.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  constructor(private recibir: CompartirDataService, private enviar_cuestionario: CuestionarioService) { }

  uid!: string;

  // Variables of the object
  titulo!: any;
  descripcion!: any;

  // DOM variables
  success_full_alert!:boolean;

  ngOnInit(): void {
    this.recibir.share.subscribe(async (respuesta: any) => {
      this.uid = await respuesta.user.uid;
      console.log(this.uid);
    })
  }

  Almacenador: any[] = [
    {
      cuestionario: {
        pregunta: '',
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
        respuesta4: ''
      }
    },
    {
      cuestionario: {
        pregunta: '',
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
        respuesta4: ''
      }
    },
    {
      cuestionario: {
        pregunta: '',
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
        respuesta4: ''
      }
    },
    {
      cuestionario: {
        pregunta: '',
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
        respuesta4: ''
      }
    }
  ];

  Guardar() {
    const header = { titulo: this.titulo, descripcion: this.descripcion }

    const all = {
      cabecera: header,
      secciones: this.Almacenador
    }

    this.enviar_cuestionario.enviarData(all,this.uid).then(() => {
      this.Alerta_success();
    })
  }

  Alerta_success() {
    this.success_full_alert = true;
    const quitar_alerta = () => {
      // Quitando alerta
      this.success_full_alert = false;
    }
    setTimeout(quitar_alerta, 4000);
  }


}