import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/models/IUsuario.interface';
import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  id = 0;
  Usuario: IUsuario = {
    PkUsuario: 0,
    nombre: '',
    username: '',
    apellido: '',
    correo: '',
    password: '',
    token: '',
    emailconfirmed: false,
    telefono: '',
    direccion: '',
    fkRol: 0,
  };
  constructor(public router: Router, public route: ActivatedRoute, public user: UserStoreService, private fb: FormBuilder) { }
  editForm: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Username: ['', Validators.required],
    Correo: ['', Validators.required],
    Apellido: ['', Validators.required],
    Telefono: ['', Validators.required],
    Direccion: ['', Validators.required],
    FKRol: ['', Validators.required],
  });
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    if (!this.id) {
      this.router.navigate(['base/NotFound']);
    }
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.user.buscarPorId(this.id).subscribe(
      (response) => {
        this.Usuario = response;
        this.editForm.patchValue({
          Nombre: this.Usuario.nombre,
          Username: this.Usuario.username,
          Correo: this.Usuario.correo,
          Apellido: this.Usuario.apellido,
          Telefono: this.Usuario.telefono,
          Direccion: this.Usuario.direccion,
          FKRol: this.Usuario.fkRol
        });

      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  guardarUsuario() {
    if (this.editForm.valid) {
      this.Usuario.nombre = this.editForm.controls['Nombre'].value;
      this.Usuario.username = this.editForm.controls['Username'].value;
      this.Usuario.correo = this.editForm.controls['Correo'].value;
      this.Usuario.apellido = this.editForm.controls['Apellido'].value;
      this.Usuario.telefono = this.editForm.controls['Telefono'].value;
      this.Usuario.direccion = this.editForm.controls['Direccion'].value;
      this.Usuario.fkRol = this.editForm.controls['FKRol'].value;
      const x = this.user.editarUsuario(this.Usuario);
      if(x){
        setTimeout(() => {
          this.router.navigate(['base/usuarios']);
        }, 2000);
      }
    }
  }

}