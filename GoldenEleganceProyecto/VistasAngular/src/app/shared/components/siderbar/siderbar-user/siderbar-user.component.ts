import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-siderbar-user',
  templateUrl: './siderbar-user.component.html',
  styleUrls: ['./siderbar-user.component.css']
})
export class SiderbarUserComponent {
  constructor(private auth: AuthService) { }

  logout() {
    this.auth.signOut();
  }
}
