import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Para las notificaciones
import { SucursalService } from '../../services/sucursal.service'; 
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  comentarioForm!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, // Para mostrar alertas
    private sucursalService: SucursalService // Servicio que gestiona las sucursales
  ) {}

  ngOnInit() {
    // Inicializamos el formulario con los campos requeridos y validaciones
    this.comentarioForm = this.formBuilder.group({
      nombreTienda: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      tipoQueja: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      evaluacion: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  // Método para enviar el formulario
  onSubmit() {
    this.formSubmitted = true; // Marcamos el formulario como enviado

    if (this.comentarioForm.valid) {
      const formData = this.comentarioForm.value;

      // Verificar si la sucursal ya existe
      this.sucursalService.getSucursalByName(formData.nombreTienda).subscribe((sucursalExistente: any) => {
        if (sucursalExistente) {
          // Si la sucursal existe, añadimos el comentario a esa sucursal
          this.sucursalService.addCommentToSucursal(sucursalExistente.id, formData).subscribe(() => {
            this.snackBar.open('Comentario enviado a la sucursal existente', 'Cerrar', { duration: 3000 });
            this.clearForm();
          });
        } else {
          // Si la sucursal no existe, creamos una nueva
          const nuevaSucursal = {
            nombre: formData.nombreTienda,
            direccion: formData.direccion,
            estrellas: formData.evaluacion // O cualquier valor que quieras asignar
          };

          this.sucursalService.createSucursal(nuevaSucursal).subscribe((nuevaSucursalCreada: any) => {
            // Luego añadimos el comentario a la nueva sucursal
            this.sucursalService.addCommentToSucursal(nuevaSucursalCreada.id, formData).subscribe(() => {
              this.snackBar.open('Nueva sucursal creada y comentario añadido', 'Cerrar', { duration: 3000 });
              this.clearForm();
            });
          });
        }
      });
    } else {
      // Mostrar mensaje de error si el formulario no es válido
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  // Método para limpiar el formulario
  clearForm() {
    this.comentarioForm.reset(); // Reiniciar los valores del formulario
    this.formSubmitted = false; // Reiniciar el estado del formulario
  }

  // Método para verificar si el formulario es válido
  isFormValid(): boolean {
    return this.comentarioForm.valid;
  }
}
