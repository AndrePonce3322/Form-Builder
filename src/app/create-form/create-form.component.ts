import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuestionarioService } from '../Services/cuestionario.service';
import { LocalStorageService } from '../Services/local-storage.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {

  UID!: string;

  constructor( private enviar_cuestionario: CuestionarioService, private navegar: Router, private localStorage: LocalStorageService) { 
    // Tomando la data del ser
    this.UID = localStorage.get('cuenta').user.uid;
  }

  // Variables of the object
  titulo!: any;
  descripcion!: any;

  // DOM variables
  success_full_alert!: boolean;

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

    this.enviar_cuestionario.enviarData(all, this.UID).then(() => {
      this.Alerta_success();
      this.navegar.navigate(['/forms/list']);
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