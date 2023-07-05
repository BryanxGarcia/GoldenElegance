import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategoria } from 'src/app/models/ICategoria.interface';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  id= 0;
  Categoria: ICategoria={
    pkCategoria: 0,
    nombreCat: '',
    descripcion: ''
  }
  constructor(private route: ActivatedRoute, private catService:CategoriaService, private fb: FormBuilder) { }
  editarCategoria: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Descripcion: ['', Validators.required],
    
  });
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.obtenerCategoria();
    
  }

  obtenerCategoria(){
    this.catService.buscarPorId(this.id).subscribe(
      (response) => {
        this.Categoria = response;
        this.editarCategoria.controls['Nombre'].setValue(this.Categoria.nombreCat);
        this.editarCategoria.controls['Descripcion'].setValue(this.Categoria.descripcion);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  editarCategorias(){
    this.Categoria.nombreCat= this.editarCategoria.controls['Nombre'].value;
    this.Categoria.descripcion= this.editarCategoria.controls['Descripcion'].value;

    this.catService.editarCategoria(this.Categoria);
  }

}