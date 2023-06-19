import { Component } from '@angular/core';
import { UserStoreService } from 'src/app/services/Usuarios/user-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nadvar-user',
  templateUrl: './nadvar-user.component.html',
  styleUrls: ['./nadvar-user.component.css']
})
export class NadvarUserComponent {
  constructor(private auth: AuthService, private userStore: UserStoreService) { }

  public username: string = "";
  ngOnInit() {

    this.userStore.getUsernameFromStore()
      .subscribe(valor => {
        let fullNameFromToken = this.auth.getUsernameFromToken();
        this.username = valor || fullNameFromToken
      })
  }

  logout() {
    this.auth.signOut();
  }
}
