import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-navigator',
  templateUrl: './dashboard-navigator.component.html',
  styleUrls: ['./dashboard-navigator.component.css']
})
export class DashboardNavigatorComponent implements OnInit {
  constructor(private auth: AuthService) { }
  usuario = "";

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  
  logout() {
    this.auth.signOut();
  }

  obtenerUsuario() {
    const username = this.auth.getUsernameFromToken();
    this.usuario = username;
  }
}