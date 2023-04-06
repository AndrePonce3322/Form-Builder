import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-created',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms-component.css']
})
export class ListFormsComponent {

  constructor(private navegar: Router) { }


  Crear() {
    this.navegar.navigate([`forms/create/${this.GenerarCodigo()}`]);
  }

  GenerarCodigo(){
    let codigo = '';
    const caracteres = 'ab__cde+$1f_65684++ghi&j323k++lmnopq2$_&iminthespace mi bro34s123rst_8uvwxyz';

    for(let i = 0; i < 25; i++){
      codigo += caracteres[Math.round(Math.random()*caracteres.length)];
    }

    return codigo
  }

}
