import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarEmail } from 'src/app/models/confirmarEmail.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmar-email',
  templateUrl: './confirmar-email.component.html',
  styleUrls: ['./confirmar-email.component.css']
})
export class ConfirmarEmailComponent implements OnInit{
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
  }
}




