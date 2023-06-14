import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nadvar-user',
  templateUrl: './nadvar-user.component.html',
  styleUrls: ['./nadvar-user.component.css']
})
export class NadvarUserComponent {
  constructor (private auth: AuthService ){

  }

}
