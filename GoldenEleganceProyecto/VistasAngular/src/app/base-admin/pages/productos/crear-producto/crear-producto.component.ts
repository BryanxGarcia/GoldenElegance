import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/productsService/products.service';
import { ICategoria } from 'src/app/models/ICategoria.interface';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public productoService: ProductsService,
    public catServicio: CategoriaService
  ) { }
  ngOnInit(): void {
    this.obtenerCategorias()
  }
  Categorias: ICategoria[] = [];

  productoForm: FormGroup = this.fb.group({
    NombreProducto: ['', Validators.required],
    Descripcion: ['', Validators.required],
    FkCategoria: ['', Validators.required],
    PrecioVenta: ['', Validators.required],
    Inventario: ['', Validators.required],
    Imagen: ['', Validators.required],

  });

  opcionSeleccionada= 0;

  obtenerCategorias() {
    this.catServicio.listarCategorias().subscribe(
      (response) => {
        this.Categorias = response;
        console.log(this.Categorias)
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  registrarProducto() {
    if (this.productoForm.valid) {
      this.productoService.crearProducto(this.productoForm.value);
    }
  }

}
