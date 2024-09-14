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

  // Obtener sucursal por su ID
  getSucursalById(sucursalId: number): Observable<any> {
    const sucursal = this.sucursales.find(s => s.id === sucursalId);
    return of(sucursal);
  }

  // Añadir comentario a una sucursal existente
  addCommentToSucursal(sucursalId: number, comentario: any): Observable<any> {
    const sucursal = this.sucursales.find(s => s.id === sucursalId);
    if (sucursal) {
      sucursal.comentarios.push(comentario); // Añadir el comentario a la sucursal
    }
    return of(comentario); 
  }

  // Obtener lista de sucursales con opción de ordenar por estrellas
  getSucursales(sortOrder: string = ''): Observable<any[]> {
    let sortedSucursales = [...this.sucursales];
    
    if (sortOrder === 'asc') {
      sortedSucursales.sort((a, b) => a.estrellas - b.estrellas);
    } else if (sortOrder === 'desc') {
      sortedSucursales.sort((a, b) => b.estrellas - a.estrellas);
    }
    
    return of(sortedSucursales);
  }
}
