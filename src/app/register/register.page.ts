import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; // Import AlertController
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private navCtrl: NavController, 
    private userService: UserService, 
    private alertController: AlertController // Inject AlertController
  ) {}

  // Method for registering user
  async register() {
    if (this.isFormValid()) {
      const success = this.userService.registerUser(
        this.username, 
        this.password, 
        this.securityQuestion, 
        this.securityAnswer
      );
      if (success) {
        await this.presentAlert('Success', 'Registro exitoso para el usuario: ' + this.username);
        this.navCtrl.navigateBack('/login');
      } else {
        await this.presentAlert('Error', 'El nombre de usuario ya está en uso.');
      }
    } else {
      await this.presentAlert('Error', 'Por favor, complete todos los campos.');
    }
  }

  // Validate form fields
  isFormValid(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      /^[a-zA-Z0-9]{3,8}$/.test(this.username) &&
      this.password.trim() !== '' &&
      this.securityQuestion.trim() !== '' &&
      this.securityAnswer.trim() !== ''
    );
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // Navigate back to login
  cancel() {
    this.navCtrl.navigateBack('/login');
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
