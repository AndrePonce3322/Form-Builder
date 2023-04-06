import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  // Form group variable
  RegisterForm!: FormGroup;

  // DOM variable
  email_already_use!: boolean;
  alert_danger!: boolean;
  alert_success!: boolean;

  constructor(private register_service: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),
      recordar: new FormControl(true)
    })
  }

  Registrar() {
    if (this.RegisterForm.value.password.length < 8 || this.RegisterForm.value.email.indexOf('@') == -1) {
      this.Alerta_danger();
      return console.log('No te puedes loguear');
    }

    this.register_service.registrar(this.RegisterForm.value).then(() => {
      this.Alerta_success();

      if(this.RegisterForm.value.recordar == true){
        this.Recordarme();
      }

      this.RegisterForm.reset();

    }).catch(error => {
      if (error.code == 'auth/email-already-in-use') {
        this.email_already_use = true;
        this.Alerta_danger();
      }
    })
  }

  GoogleLogin() {
    this.register_service.GoogleLogin().then(() => {
      this.Alerta_success();
    }).catch(error => console.log(error));
  }

  Facebook() {
    this.register_service.FacebookLogin().then(respuesta => {
      console.log(respuesta);
    }).catch(() => {
      console.log('Chupamela, no tenes la politica válida')
    })
  }

  Recordarme() {
    this.register_service.Persitencia().then((respuesta) => {
      console.log('La persistencia está en función', respuesta);
    }).catch((error) => {
      console.log('No se pudo agregar la persistencia', error);
    })
  }

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
      this.alert_success = false;
    }
    setTimeout(quitar_alerta, 4000);
  }

}
