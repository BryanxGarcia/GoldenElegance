import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-navigator',
  templateUrl: './dashboard-navigator.component.html',
  styleUrls: ['./dashboard-navigator.component.css']
})
export class DashboardNavigatorComponent {
  constructor(private auth: AuthService) { }

  logout() {
    this.auth.signOut();
  }
}