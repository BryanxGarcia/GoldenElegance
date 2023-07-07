import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { IMensajeria } from 'src/app/models/IMensajeria.interface';
import { IResponse } from 'src/app/models/IResponse.interface';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})

export class ContactanosComponent {

  constructor(private formB: FormBuilder, public mensajeriaS: MensajeriaService, private route:Router) { }

  contactoForm:FormGroup = this.formB.group({
   Nombre:["", Validators.required],
   Correo:["", Validators.required],
   Numero:["", Validators.required],
   Mensaje:["", Validators.required]
  });

  mensaje: IMensajeria ={
    Para:"",
    Asunto:"",
    Contenido:""
  }
  onSubmit() : void {
    if (this.contactoForm.valid) {
      this.mensaje.Para =(this.contactoForm.controls['Correo'].value);
      this.mensaje.Contenido =("Nombre del contactador: " + this.contactoForm.controls['Nombre'].value + "\n Numero de telefono: " + this.contactoForm.controls['Numero'].value + "\n Mensaje: " + this.contactoForm.controls['Mensaje'].value);

      this.mensajeriaS
        .enviarContacto(this.mensaje)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let response: IResponse = {
              success: false,
              helperData: '',
              message: '',
            };
            if(error.status == 404 || error.status == 400 || error.status == 401){
              if(error.error != null){
                response = error.error;
              }
            }
            return of(response);
          })
        )
        .subscribe((response: IResponse) => {
          if (response.success) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.contactoForm.reset();
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: response.helperData,
              text: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  }
}
