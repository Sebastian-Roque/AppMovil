import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  comentarioForm!: FormGroup;
  formSubmitted: boolean = false;
  sucursales: any[] = [];  // Lista de sucursales creadas
  direccionBloqueada: boolean = false; // Estado del campo de dirección

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, 
    private sucursalService: SucursalService 
  ) {}

  ngOnInit() {
    // Inicializamos el formulario con los campos requeridos y validaciones
    this.comentarioForm = this.formBuilder.group({
      sucursal: ['', Validators.required],
      direccion: [{ value: '', disabled: this.direccionBloqueada }, Validators.required],
      fechaHora: ['', Validators.required],
      tipoQueja: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      evaluacion: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    // Cargar las sucursales existentes
    this.loadSucursales();
  }

  // Cargar sucursales existentes desde el servicio
  loadSucursales() {
    this.sucursalService.getSucursales().subscribe((data: any) => {
      this.sucursales = data;  // Asignar las sucursales obtenidas
    });
  }

  // Método que se ejecuta cuando cambia la selección de sucursal
  onSucursalChange(event: any) {
    const sucursalId = event.value;
    const sucursalSeleccionada = this.sucursales.find(s => s.id === sucursalId);
    
    if (sucursalSeleccionada) {
      this.comentarioForm.patchValue({
        direccion: sucursalSeleccionada.direccion  // Llenar el campo de dirección
      });
      this.direccionBloqueada = true;  // Bloquear el campo de dirección
    }
  }

  // Método para enviar el formulario
  onSubmit() {
    this.formSubmitted = true;

    if (this.comentarioForm.valid) {
      const formData = this.comentarioForm.value;

      // Añadir el comentario a la sucursal seleccionada
      this.sucursalService.addCommentToSucursal(formData.sucursal, formData).subscribe(() => {
        this.snackBar.open('Comentario enviado a la sucursal', 'Cerrar', { duration: 3000 });
        this.clearForm();
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  // Método para limpiar el formulario
  clearForm() {
    this.comentarioForm.reset();
    this.formSubmitted = false;
    this.direccionBloqueada = false; // Restablecer el estado de la dirección
  }
}
