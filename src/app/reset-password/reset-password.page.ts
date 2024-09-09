import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  isUserValidated: boolean = false;
  isSecurityValidated: boolean = false;

  newPasswordType: string = 'password';
  newPasswordIcon: string = 'eye-off';

  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off';

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  // Validar usuario y mostrar la pregunta de seguridad
  async validateUser() {
    const user = this.userService.userExists(this.username);
    if (user) {
      this.securityQuestion = this.camelCaseToNormalText(user.securityQuestion);
      this.isUserValidated = true;
    } else {
      await this.presentAlert('Error', 'Usuario no encontrado');
    }
  }

  // Validar la respuesta de la pregunta de seguridad
  async validateSecurityAnswer() {
    const isAnswerValid = this.userService.validateSecurityQuestion(this.username, this.securityAnswer);
    if (isAnswerValid) {
      this.isSecurityValidated = true;
    } else {
      await this.presentAlert('Error', 'Respuesta incorrecta');
    }
  }

  // Actualizar la contraseña
  async updatePassword() {
    if (this.newPassword === this.confirmPassword) {
      const success = this.userService.updatePassword(this.username, this.newPassword);
      if (success) {
        await this.presentAlert('Éxito', 'Contraseña actualizada con éxito');
        this.navCtrl.navigateBack('/login');
      } else {
        await this.presentAlert('Error', 'Error al actualizar la contraseña');
      }
    } else {
      await this.presentAlert('Error', 'Las contraseñas no coinciden');
    }
  }

  // Ver y ocultar la nueva contraseña
  toggleNewPasswordVisibility() {
    this.newPasswordType = this.newPasswordType === 'password' ? 'text' : 'password';
    this.newPasswordIcon = this.newPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // Ver y ocultar la confirmación de contraseña
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordType = this.confirmPasswordType === 'password' ? 'text' : 'password';
    this.confirmPasswordIcon = this.confirmPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // Validar todos los inputs con un solo botón
  async validateInputs() {
    if (!this.isUserValidated) {
      await this.validateUser();
    } else if (!this.isSecurityValidated) {
      await this.validateSecurityAnswer();
    } else {
      await this.updatePassword();
    }
  }

  // Convert camelCase to normal text
  camelCaseToNormalText(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
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
