import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';  

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.page.html',
  styleUrls: ['./sucursal.page.scss'],
})
export class SucursalPage implements OnInit {
  sucursales: any[] = [];
  filteredSucursales: any[] = [];
  searchTerm: string = '';
  sortOrder: string = '';  // Inicializamos el filtro vacío

  constructor(private sucursalService: SucursalService) {}

  ngOnInit() {
    this.getSucursales();  
  }

  getSucursales() {
    this.sucursalService.getSucursales(this.sortOrder).subscribe((data) => {
      this.sucursales = data;
      this.filteredSucursales = this.sucursales; 
    });
  }

  filterSucursales(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredSucursales = this.sucursales.filter((sucursal) =>
      sucursal.nombre.toLowerCase().includes(searchValue) ||
      sucursal.direccion.toLowerCase().includes(searchValue)
    );
  }

  onSortChange(event: any) {
    this.sortOrder = event.detail.value;
    this.getSucursales();  
  }

  // Método para limpiar el filtro
  clearFilter() {
    this.sortOrder = '';  // Restablecer el filtro
    this.getSucursales();  // Recargar las sucursales sin filtro
  }

  viewComments(sucursal: any) {
    console.log('Ver comentarios de la sucursal:', sucursal);
  }
}
