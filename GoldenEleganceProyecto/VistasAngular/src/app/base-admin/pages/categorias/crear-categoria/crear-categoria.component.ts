import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {
  constructor(
    private fb: FormBuilder,
    private catService: CategoriaService,
  ) { }
  crearCategoria: FormGroup = this.fb.group({
    NombreCat: ['', Validators.required],
    Descripcion: ['', Validators.required],
  });

  registrarCategoria() {
    if (this.crearCategoria.valid) {
      this.catService.registrarcategoria(this.crearCategoria.value);
    }
  }

}