import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarEmail } from 'src/app/models/confirmarEmail.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-email',
  templateUrl: './confirmar-email.component.html',
  styleUrls: ['./confirmar-email.component.css']
})
export class ConfirmarEmailComponent {
  constructor(private route: Router, private activaterouter: ActivatedRoute, private authS: AuthService) { }

  emailToReset!: string;
  emailtoken!: string;
  confirmarObj =  new ConfirmarEmail();

  ngOnInit(): void {
    this.activaterouter.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      const uriToken = val['code'];
      this.emailtoken = uriToken.replace(/ /g, '+');
    });

    this.confirmarObj.email = this.emailToReset;
    this.confirmarObj.emailToken = this.emailtoken;
    this.confirmarCuenta();
  }

  confirmarCuenta() {
    this.authS.confirmarCuenta(this.confirmarObj)
      .subscribe({
        next: (res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se confirmo correctamente la cuenta',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigate(['login']);
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Sucedio un error al confirmar la cuenta',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
  }
}




