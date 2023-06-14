import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) { }

  singUpForm!: FormGroup;
  claseDiv: string = 'container';

  kt_form: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Username: ['', Validators.required],
    Correo: ['', Validators.required],
    Password: ['', Validators.required]
  })

  loginForm: FormGroup = this.fb.group({
    Correo: ['', Validators.required],
    Password: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  cambiar() {
    this.claseDiv = 'container  right-panel-active';
  }

  eliminar() {
    this.claseDiv = 'container';
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value)
      .subscribe({
        next: (res) =>{
          this.auth.storeToken(res.token)
          this.route.navigate(['base/dashboard'])   
             },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    } else {
//Validar Form
    }
  }
  onSingUp() {
    if (this.kt_form.valid) {
      console.log(this.kt_form.value)
      this.auth.signUp(this.kt_form.value)
      .subscribe({
        next: (res) =>{
          alert(res.message)
          this.kt_form.reset();
          this.route.navigate(['login'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    } else {
//Validar Form

    }
  }
}