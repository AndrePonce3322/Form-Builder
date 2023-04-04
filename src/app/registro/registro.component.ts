import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  // Form group variable
  RegisterForm!: FormGroup;

  // DOM variable

  constructor(private login_service: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)])
    })
  }

  Registrar() {
    console.log(this.RegisterForm.value);

    this.login_service.registrar(this.RegisterForm.value).then((respuesta)=>{
      this.RegisterForm.reset();
    })
  }


  GoogleLogin() {
    this.login_service.GoogleLogin().then((data) => {
      
    }).catch(error => console.log(error));
  }
}
