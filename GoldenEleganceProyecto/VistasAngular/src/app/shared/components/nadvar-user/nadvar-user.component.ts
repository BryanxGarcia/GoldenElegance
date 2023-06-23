import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nadvar-user',
  templateUrl: './nadvar-user.component.html',
  styleUrls: ['./nadvar-user.component.css']
})
export class NadvarUserComponent implements OnInit{
  constructor(private auth: AuthService, private userStore: UserStoreService) { }

  username = "";
  ngOnInit() {

    this.userStore.getUsernameFromStore()
      .subscribe(valor => {
        const fullNameFromToken = this.auth.getUsernameFromToken();
        this.username = valor || fullNameFromToken
      })
  }

  logout() {
    this.auth.signOut();
  }
}
