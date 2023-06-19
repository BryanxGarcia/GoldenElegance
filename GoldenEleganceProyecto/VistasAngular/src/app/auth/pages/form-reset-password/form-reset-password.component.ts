import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { confirmarPasswordValidation } from 'src/app/shared/helpers/confirmar-password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.css']
})
export class FormResetPasswordComponent implements OnInit {
  constructor(private formB: FormBuilder, private route: Router, private activaterouter: ActivatedRoute, private authS: AuthService) { }


  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailtoken!: string;
  resetPasswordObj = new ResetPassword();

  ngOnInit(): void {
    this.resetPasswordForm = this.formB.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    }, {
      validator: confirmarPasswordValidation('password', 'confirmPassword', 'password-mismatch')
    });

    this.activaterouter.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      const uriToken = val['code'];
      this.emailtoken = uriToken.replace(/ /g, '+');
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword=this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken=this.emailtoken;

      this.authS.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se restablecio correctamente la contraseña',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigate(['login']);
        },
        error:(err)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Sucedio un error al cambiar la contraseña',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
    }
  }
}
