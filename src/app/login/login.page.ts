import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  passwordType: string = 'password';  // Para alternar la visibilidad de la contraseña
  passwordIcon: string = 'eye-off';   // Icono para alternar la visibilidad de la contraseña

  constructor(
    private navCtrl: NavController, 
    private userService: UserService, 
    private alertController: AlertController
  ) {}

  // Función para iniciar sesión
  async login() {
    if (this.userService.validateLogin(this.username, this.password)) {
      // Guardar el usuario en localStorage cuando el login sea exitoso
      const user = { username: this.username };
      localStorage.setItem('user', JSON.stringify(user));  // Guardar en localStorage

      // Mostrar alerta de éxito
      await this.presentAlert('Inicio de sesión exitoso', 'Bienvenido a QuienesSomos!!');
      this.navCtrl.navigateForward(['/tabs/home']);  // Redirigir al home
    } else {
      // Mostrar alerta de error si las credenciales son incorrectas
      await this.presentAlert('Error', 'Credenciales incorrectas.');
    }
  }

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // Redirigir al modo invitado
  goToInvitado() {
    this.navCtrl.navigateForward(['/tabs/home']);
  }

  // Redirigir a la página de registro
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  // Redirigir a la página de recuperación de contraseña
  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }

  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
