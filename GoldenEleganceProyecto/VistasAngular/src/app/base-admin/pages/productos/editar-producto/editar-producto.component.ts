import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategoria } from 'src/app/models/ICategoria.interface';
import { IProductos } from 'src/app/models/IProductos.interface.';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  id= 0;
  Categorias: ICategoria[] = [];
  Producto: IProductos = {
    pkCategoria: 0,
    nombreProducto: '',
    descripcion: '',
    fkCategoria: 0,
    precioVenta: 0,
    inventario: 0,
    imagen: ''
  };
  opcionSeleccionada=0;

  constructor(
    private route: ActivatedRoute, 
    private productosService:ProductsService, 
    private fb: FormBuilder,
    private catServicio:CategoriaService) { }
  editarProductoForm: FormGroup = this.fb.group({
    NombreProducto: ['', Validators.required],
    Descripcion: ['', Validators.required],
    FkCategoria: ['', Validators.required],
    precioVenta: ['', Validators.required],
    Inventario: ['', Validators.required],
    Imagen: ['', Validators.required],
  });
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    });
    this.obtenerProducto();
    this.obtenerCategorias();
    
  }

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
  obtenerProducto(){
    this.productosService.buscarPorId(this.id).subscribe(
      (response) => {
        this.Producto = response;
        this.editarProductoForm.controls['NombreProducto'].setValue(this.Producto.nombreProducto);
        this.editarProductoForm.controls['Descripcion'].setValue(this.Producto.descripcion);
        this.editarProductoForm.controls['FkCategoria'].setValue(this.Producto.fkCategoria);
        this.editarProductoForm.controls['precioVenta'].setValue(this.Producto.precioVenta);
        this.editarProductoForm.controls['Inventario'].setValue(this.Producto.inventario);
        this.editarProductoForm.controls['Imagen'].setValue(this.Producto.imagen);
        this.opcionSeleccionada = this.Producto.fkCategoria;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  editarProducto(){
    console.log(this.Producto)
    this.Producto.nombreProducto= this.editarProductoForm.controls['NombreProducto'].value;
    this.Producto.descripcion= this.editarProductoForm.controls['Descripcion'].value;
    this.Producto.fkCategoria= this.editarProductoForm.controls['FkCategoria'].value;
    this.Producto.precioVenta= this.editarProductoForm.controls['precioVenta'].value;
    this.Producto.inventario= this.editarProductoForm.controls['Inventario'].value;
    this.Producto.imagen= this.editarProductoForm.controls['Imagen'].value;

    this.productosService.editarProducto(this.Producto);
  }

}