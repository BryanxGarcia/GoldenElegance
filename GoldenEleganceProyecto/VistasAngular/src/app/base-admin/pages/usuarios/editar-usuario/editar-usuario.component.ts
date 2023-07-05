import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from 'src/app/models/IUsuario.interface';
import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  id= 0;
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
  constructor(private route: ActivatedRoute, private user:UserStoreService, private fb: FormBuilder) { }
  editForm: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Username: ['', Validators.required],
    Correo: ['', Validators.required],
    Password: ['', Validators.required],
    Apellido: ['', Validators.required],
    Telefono: ['', Validators.required],
    Direccion: ['', Validators.required],
    FKRol: ['', Validators.required],
  });
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    });
    this.obtenerUsuario();
    
  }

  obtenerUsuario(){
    this.user.buscarPorId(this.id).subscribe(
      (response) => {
        this.Usuario = response;
        this.editForm.controls['Nombre'].setValue(this.Usuario.nombre);
        this.editForm.controls['Username'].setValue(this.Usuario.username);
        this.editForm.controls['Correo'].setValue(this.Usuario.correo);
        this.editForm.controls['Apellido'].setValue(this.Usuario.apellido);
        this.editForm.controls['Telefono'].setValue(this.Usuario.telefono);
        this.editForm.controls['Direccion'].setValue(this.Usuario.direccion);
        this.editForm.controls['FKRol'].setValue(this.Usuario.fkRol);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  guardarUsuario(){
    this.Usuario.nombre= this.editForm.controls['Nombre'].value;
    this.Usuario.username= this.editForm.controls['Username'].value;
    this.Usuario.correo= this.editForm.controls['Correo'].value;
    this.Usuario.apellido= this.editForm.controls['Apellido'].value;
    this.Usuario.telefono= this.editForm.controls['Telefono'].value;
    this.Usuario.direccion= this.editForm.controls['Direccion'].value;
    this.Usuario.fkRol= this.editForm.controls['FKRol'].value;

    console.log(this.Usuario)
    this.user.editarUsuario(this.Usuario);
  }

}