import { Component } from '@angular/core';
import { CompartirDataService } from '../Services/compartir-data.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  nombre: any;

  constructor(private compartir_datos: CompartirDataService) {
    this.compartir_datos.share.subscribe((respuesta: any) => {
      const full_name = respuesta.user.displayName;
      this.nombre = full_name.split(' ')[0];
      console.log(this.nombre);
    });
  }
}
