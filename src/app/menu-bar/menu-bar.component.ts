import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../Services/local-storage.service';
import { Router } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  nombre: any;

  constructor(private localStorage: LocalStorageService, private navegar: Router) {
    const full_name = localStorage.get('cuenta').user.displayName;

    try {
      this.nombre = full_name.split(' ')[0];
    } catch (error) {
      console.log('No se puede tomar tu nombre');
    }
  }

  ngOnInit(): void {
    const element_title = document.querySelector('.title-text') as HTMLElement;

    const typed = new Typed(element_title, {
      strings: ['builder', 'fast'],
      typeSpeed: 30,
      backSpeed: 30,
      backDelay: 10000,
      loop: true
    })
  }

  CerrarSesion() {
    this.navegar.navigate(['/login']).then(() => {
      this.localStorage.clear();
      console.log('Sesión cerrada correctamente');
    })
  }
}
