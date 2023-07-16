import { IHistorial } from 'src/app/models/IHistorial.interface';
import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historialService/historial.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit{

  constructor(private historialS: HistorialService, private userService: AuthService) { }

  Historial: IHistorial[] = [];
  usuario = "";
  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerProductos();

  }

  obtenerUsuario() {
    const username = this.userService.getUsernameFromToken();
    this.usuario = username;
  }
  obtenerProductos() {
    this.historialS.listarHistorialPorUsuario(this.usuario).subscribe(data => {
      this.Historial = data;
      this.transformarFechasHistorial();

    })
  }
  transformarFechasHistorial() {
    this.Historial.forEach(item => {
        item.fechaVenta =  this.transformarFecha(item.fechaVenta);
    });
  }
  transformarFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const dia = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth() + 1;
    const anio = fechaObjeto.getFullYear();

    return `${dia < 10 ? '0' + dia : dia}-${mes < 10 ? '0' + mes : mes}-${anio}`;
  }
}
