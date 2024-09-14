import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';  
import { NavController } from '@ionic/angular';  // Importar NavController

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.page.html',
  styleUrls: ['./sucursal.page.scss'],
})
export class SucursalPage implements OnInit {
  sucursales: any[] = [];
  filteredSucursales: any[] = [];
  searchTerm: string = '';
  sortOrder: string = 'asc';  

  constructor(
    private sucursalService: SucursalService, 
    private navCtrl: NavController  // Inyectar NavController
  ) {}

  ngOnInit() {
    this.getSucursales();  
  }

  // Método para obtener las sucursales con un parámetro de orden
  getSucursales() {
    this.sucursalService.getSucursales(this.sortOrder).subscribe((data) => {
      this.sucursales = data;
      this.filteredSucursales = this.sucursales; 
    });
  }

  // Filtro de sucursales basado en el término de búsqueda
  filterSucursales(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredSucursales = this.sucursales.filter((sucursal) =>
      sucursal.nombre.toLowerCase().includes(searchValue) ||
      sucursal.direccion.toLowerCase().includes(searchValue)
    );
  }

  // Método para manejar el cambio de orden
  onSortChange(event: any) {
    this.sortOrder = event.detail.value;
    this.getSucursales();  
  }

  // Método para regresar a la página anterior
  goBack() {
    this.navCtrl.back();  // Regresar a la página anterior en el historial
  }

  viewComments(sucursal: any) {
    console.log('Ver comentarios de la sucursal:', sucursal);
  }
}
