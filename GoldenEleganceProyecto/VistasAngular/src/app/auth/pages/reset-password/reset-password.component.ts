import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private formB: FormBuilder, public authS:AuthService ) { }

  emailPassword:FormGroup = this.formB.group({
    Correo:["", Validators.required],
   });
 
 
   onSubmit(){
    if(this.emailPassword.valid){
      this.authS.sendResetPassword(this.emailPassword.controls['Correo'].value)
    }
  }
}

