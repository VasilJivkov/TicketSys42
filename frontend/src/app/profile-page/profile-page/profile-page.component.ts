import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { IDecodedToken } from '../../models/users/DecodedToken';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  private user: IDecodedToken;
  private requestedUser: string;
  constructor(private auth: AuthService, private acRoute: ActivatedRoute) {  }

  public ngOnInit(): void {
    this.acRoute.params.subscribe((param) => this.requestedUser = param.username);
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);
  }
}
