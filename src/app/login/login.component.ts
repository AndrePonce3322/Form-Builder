import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Form group variable
  LoginForm!: FormGroup;

  // DOM variable
  wrong!:boolean;
  user_not_found!: boolean;
  wrong_password!: boolean;

  constructor(private login_service: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),
      recordar: new FormControl(true)
    })
  }

  Loguear() {
    console.log(this.LoginForm.value);

    this.login_service.login(this.LoginForm.value).then(respuesta => {
      this.user_not_found = false;
      this.wrong_password = false;
      this.wrong = false;

      if(this.LoginForm.value.recordar == true){
        this.Recordarme();
      }

      console.log(respuesta);
    }).catch((error: any) => {
      switch (error.code) {
        case 'auth/wrong-password':
          this.wrong_password = true;
          this.wrong = true;
          break;
        case 'auth/user-not-found':
          this.user_not_found = true;
          this.wrong = true;
          break;
      }
    })
  }

  GoogleLogin() {
    this.login_service.GoogleLogin().then((data) => {
      this.user_not_found = false;
    }).catch(error => this.user_not_found = true);
  }

  Facebook(){
    this.login_service.FacebookLogin().then(respuesta=>{
      console.log(respuesta);
    }).catch(error=>{
      console.log('Chupamela, no tenes la politica válida')
    })
  }

  Recordarme() {
    this.login_service.Persitencia().then((respuesta) => {
      console.log('La persistencia está en función', respuesta);
    }).catch((error) => {
      console.log('No se pudo agregar la persistencia', error);
    })
  }


}
