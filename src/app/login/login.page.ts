import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; // Import AlertController
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  passwordType: string = 'password';  // For toggling show/hide password
  passwordIcon: string = 'eye-off';   // Icon for password visibility toggle

  constructor(private navCtrl: NavController, private userService: UserService, private alertController: AlertController) {} // Inject AlertController

  async login() {
    if (this.userService.validateLogin(this.username, this.password)) {
      await this.presentAlert('Inicio de sesión exitoso.', 'Bienvenido!! a QuienesSomos!!');
      this.navCtrl.navigateForward(['/tabs/home']);
    } else {
      await this.presentAlert('Error', 'Credenciales incorrectas.');
    }
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  
  goToInvitado() {
    this.navCtrl.navigateForward(['/tabs/home']);
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }

  // Method for presenting Ionic alerts
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
