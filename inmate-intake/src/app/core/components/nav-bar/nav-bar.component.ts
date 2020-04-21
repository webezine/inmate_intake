import { Component } from '@angular/core';

import { AuthService } from 'core/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    public authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }

}
