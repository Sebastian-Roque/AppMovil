import { TestBed } from '@angular/core/testing';
import { SucursalService } from './sucursal.service';

describe('SucursalService', () => {
  let service: SucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucursalService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver sucursales ordenadas ascendente por estrellas', () => {
    const sucursales = service.getSucursales('asc');
    expect(sucursales[0].estrellas).toBeLessThanOrEqual(sucursales[1].estrellas);
  });

  it('debería devolver sucursales ordenadas descendente por estrellas', () => {
    const sucursales = service.getSucursales('desc');
    expect(sucursales[0].estrellas).toBeGreaterThanOrEqual(sucursales[1].estrellas);
  });

  it('debería agregar un comentario a una sucursal existente', () => {
    const comentario = { descripcion: 'Excelente servicio' };
    service.addCommentToSucursal(1, comentario);
    const sucursal = service.getSucursalByName('Tienda A');
    expect(sucursal.comentarios.length).toBe(1);
    expect(sucursal.comentarios[0].descripcion).toBe('Excelente servicio');
  });

  it('debería crear una nueva sucursal y agregarle un comentario', () => {
    const nuevaSucursal = {
      nombre: 'Tienda C',
      direccion: 'Dirección C',
      estrellas: 3
    };

    const comentario = { descripcion: 'Muy buen lugar' };
    const sucursalCreada = service.createSucursal(nuevaSucursal);
    service.addCommentToSucursal(sucursalCreada.id, comentario);

    const sucursal = service.getSucursalByName('Tienda C');
    expect(sucursal).toBeTruthy();
    expect(sucursal.comentarios.length).toBe(1);
    expect(sucursal.comentarios[0].descripcion).toBe('Muy buen lugar');
  });
});
