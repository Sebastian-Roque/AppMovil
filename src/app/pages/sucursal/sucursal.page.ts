import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';  // Servicio para manejar las sucursales

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.page.html',
  styleUrls: ['./sucursal.page.scss'],
})
export class SucursalPage implements OnInit {
  sucursales: any[] = [];
  sortOrder: string = 'asc';

  constructor(private sucursalService: SucursalService) {}

  ngOnInit() {
    this.getSucursales();
  }

  getSucursales() {
    this.sucursalService.getSucursales(this.sortOrder).subscribe((data) => {
      this.sucursales = data;
    });
  }

  onSortChange(event: any) {
    this.sortOrder = event.detail.value;
    this.getSucursales();
  }

  viewComments(sucursal: any) {
    console.log('Ver comentarios de la sucursal:', sucursal);
  }
}
