import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/models/IUsuario.interface';
import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit{
  id = 1;
  username="";
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
  ngOnInit() {
    this.obtenerUsername();
    this.obtenerUsuario();
  }
  constructor( private userService: AuthService, public router: Router, public route: ActivatedRoute, public user: UserStoreService, private fb: FormBuilder) { }
  editForm: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Username: ['', Validators.required],
    Correo: ['', Validators.required],
    Apellido: ['', Validators.required],
    Telefono: ['', Validators.required],
    Direccion: ['', Validators.required],
  });

  obtenerUsername() {
    const username = this.userService.getUsernameFromToken();
    this.username = username;
  }
  obtenerUsuario() {
    this.user.buscarPorUsername(this.username).subscribe(
      (response) => {
        this.Usuario = response;
        this.editForm.patchValue({
          Nombre: this.Usuario.nombre,
          Username: this.Usuario.username,
          Correo: this.Usuario.correo,
          Apellido: this.Usuario.apellido,
          Telefono: this.Usuario.telefono,
          Direccion: this.Usuario.direccion,
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
      const x =this.user.editarUsuario(this.Usuario);
      if(x){
        setTimeout(() => {
          this.router.navigate(['base/perfil']);
        }, 2000);
      }
    }
  }
}
