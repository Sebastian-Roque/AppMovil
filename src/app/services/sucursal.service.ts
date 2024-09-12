import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private sucursales: any[] = [
    { id: 1, nombre: 'Tienda A', direccion: 'Dirección A', estrellas: 4, comentarios: [] },
    { id: 2, nombre: 'Tienda B', direccion: 'Dirección B', estrellas: 5, comentarios: [] }
  ];

  constructor() {}

  getSucursalByName(nombreTienda: string): Observable<any> {
    const sucursal = this.sucursales.find(sucursal => sucursal.nombre.toLowerCase() === nombreTienda.toLowerCase());
    return of(sucursal);
  }

  createSucursal(nuevaSucursal: any): Observable<any> {
    nuevaSucursal.id = this.sucursales.length + 1; 
    nuevaSucursal.comentarios = [];
    this.sucursales.push(nuevaSucursal); 
    return of(nuevaSucursal);
  }

  addCommentToSucursal(sucursalId: number, comentario: any): Observable<any> {
    const sucursal = this.sucursales.find(s => s.id === sucursalId);
    if (sucursal) {
      sucursal.comentarios.push(comentario);
    }
    return of(comentario); 
  }

  getSucursales(sortOrder: string): Observable<any[]> {
    let sortedSucursales = [...this.sucursales];
    
    if (sortOrder === 'asc') {
      sortedSucursales.sort((a, b) => a.estrellas - b.estrellas);
    } else if (sortOrder === 'desc') {
      sortedSucursales.sort((a, b) => b.estrellas - a.estrellas);
    }
    
    return of(sortedSucursales);
  }
}
