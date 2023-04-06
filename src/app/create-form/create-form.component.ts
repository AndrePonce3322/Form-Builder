import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  Almacenador: any[] = [];
  Form!: FormGroup;

  constructor(private FormBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.Almacenador);
    this.Form = this.FormBuilder.group({
      pregunta: '',
      respuesta: ''
    })
  }

  Guardar() {
    this.Almacenador.push(this.Form.value);

    console.log(this.Almacenador);
    console.log(this.Form.value);

  }


}
