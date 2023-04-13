import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompartirDataService } from '../Services/compartir-data.service';
import { LoginService } from '../Services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Form group variable
  LoginForm!: FormGroup;

  // DOM variable
  wrong!: boolean;
  user_not_found!: boolean;
  wrong_password!: boolean;
  alert_danger!: boolean;
  alert_success!: boolean;

  constructor(
    private login_service: LoginService,
    private formBuilder: FormBuilder,
    private compartir_datos: CompartirDataService,
    private navegador: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {

    this.LoginForm = this.formBuilder.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),
      recordar: new FormControl(true)
    })


    if (localStorage.getItem('cuenta') != null) {
      this.navegador.navigate(['forms/list']);
    }
  }

  Loguear() {
    if (this.LoginForm.value.password.length < 8) {
      return alert('No te puedes loguear');
    }

    this.login_service.login(this.LoginForm.value).then(respuesta => {
      // Enviando los datos al servicio de compatir datos
      this.compartir_datos.EnviarData(respuesta);
      this.compartir_datos.RecibirDatos();

      // Enviando datos al localStorage
      this.localStorage.set('cuenta', respuesta);

      // Alerta de success
      this.Alerta_success();

      // Variables del DOM
      this.user_not_found = false;
      this.wrong_password = false;
      this.wrong = false;

      if (this.LoginForm.value.recordar == true) {
        this.Recordarme();
      }
    }).catch((error: any) => {
      this.Alerta_danger();
      switch (error.code) {
        // Validando 
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
      // Enviando datos
      this.compartir_datos.EnviarData(data);
      this.compartir_datos.RecibirDatos();

      // Guardando los datos en localStorage
      this.localStorage.set('cuenta', data);

      this.Alerta_success();

      this.user_not_found = false;
    }).catch(() => {
      this.user_not_found = true;
      this.Alerta_danger();
    });
  }

  Facebook() {
    this.login_service.FacebookLogin().then(respuesta => {
      console.log(respuesta);
    }).catch(() => {
      console.log('No tienes la politica válida');
    })
  }

  Recordarme() { }

  Alerta_danger() {
    this.alert_danger = true;
    const quitar_alerta = () => {
      this.alert_danger = false;
    }
    setTimeout(quitar_alerta, 4000);
  }

  Alerta_success() {
    this.alert_success = true;
    const quitar_alerta = () => {
      // Navegar en la ruta
      this.navegador.navigate(['forms/list']);
      // Quitando alerta
      this.alert_success = false;
    }
    setTimeout(quitar_alerta, 2000);
  }


}
