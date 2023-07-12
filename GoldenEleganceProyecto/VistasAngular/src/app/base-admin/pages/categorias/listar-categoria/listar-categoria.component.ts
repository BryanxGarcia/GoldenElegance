import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategoria } from 'src/app/models/ICategoria.interface';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  Categorias: ICategoria[]=[];

  constructor(private catServicio: CategoriaService, private router: Router) {}

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.catServicio.listarCategorias().subscribe(
      (response) => {
        this.Categorias = response;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  eliminar(id: number) {
    this.catServicio.eliminarCategoria(id);
}
irACategoria(id: number) {
  this.router.navigate(['/base/categoria/editar/', id]);
}

}
