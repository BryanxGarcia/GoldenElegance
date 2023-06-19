import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private formB: FormBuilder, private authS:AuthService ) { }

  emailPassword:FormGroup = this.formB.group({
    Correo:["", Validators.required],
   });
 
 
  onSubmit(){
  this.authS.sendResetPassword(this.emailPassword.controls['Correo'].value)
  .subscribe({
    next:(res)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario registrado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    }, 
    error:(err)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Usuario registrado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  })
  }
}

