import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Array<any> = []; // Arreglo que almacena los usuarios

  constructor() {}

  // Método para registrar un nuevo usuario
  registerUser(username: string, password: string, securityQuestion: string, securityAnswer: string) {
    const userExists = this.users.find(user => user.username === username);
    if (!userExists) {
      this.users.push({
        username,
        password,
        securityQuestion,
        securityAnswer
      });
      return true; // Usuario registrado correctamente
    } else {
      return false; // Usuario ya existe
    }
  }

  // Método para validar las credenciales en el login
  validateLogin(username: string, password: string) {
    const user = this.users.find(user => user.username === username && user.password === password);
    return !!user; // Devuelve true si el usuario es válido, false si no
  }

  // Método para verificar si el usuario existe por su nombre de usuario
  userExists(username: string) {
    return this.users.find(user => user.username === username);
  }

  // Método para verificar la respuesta a la pregunta de seguridad
  validateSecurityQuestion(username: string, securityAnswer: string) {
    const user = this.users.find(user => user.username === username && user.securityAnswer === securityAnswer);
    return !!user; // Devuelve true si la respuesta coincide, false si no
  }

  // Método para actualizar la contraseña
  updatePassword(username: string, newPassword: string) {
    const user = this.users.find(user => user.username === username);
    if (user) {
      user.password = newPassword;
      return true; // Contraseña actualizada correctamente
    }
    return false; // Usuario no encontrado
  }
}
