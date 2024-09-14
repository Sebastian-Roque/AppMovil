import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';  // Importamos el plugin App de Capacitor

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  isLoggedIn: boolean = false;  // Variable que controla si el usuario está logueado

  constructor(private platform: Platform, private navCtrl: NavController) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;
  }

  // Redirigir al login si el usuario no está logueado
  goToLogin() {
    if (!this.isLoggedIn) {
      this.navCtrl.navigateForward('/login');
    }
  }

  // Cerrar sesión y redirigir al login
  logOut() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.navCtrl.navigateRoot('/login');
  }

  // Función para salir de la app (usando Capacitor)
  exitApp() {
  }
}
