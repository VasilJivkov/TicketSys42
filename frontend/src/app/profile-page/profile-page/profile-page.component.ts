import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecodedToken } from '../../models/users/DecodedToken';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  private user: DecodedToken;
  private requestedUser: string;
  constructor(private auth: AuthService, private acRoute: ActivatedRoute) {  }

  ngOnInit() {
    this.acRoute.params.subscribe((param) => this.requestedUser = param.username)
    this.auth.user.subscribe((user: DecodedToken) => this.user = user);
  }
}
