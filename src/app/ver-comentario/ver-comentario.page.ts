import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalService } from '../../app/services/sucursal.service';

@Component({
  selector: 'app-ver-comentario',
  templateUrl: './ver-comentario.page.html',
  styleUrls: ['./ver-comentario.page.scss'],
})
export class VerComentarioPage implements OnInit {
  sucursalId: number = 0;
  comentarios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sucursalService: SucursalService
  ) {}

  ngOnInit() {
    // Obtener el ID de la sucursal desde la URL
    this.sucursalId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
    this.getComentarios();
  }

  getComentarios() {
    this.sucursalService.getComentariosBySucursal(this.sucursalId).subscribe((data) => {
      this.comentarios = data;
    });
  }
}
