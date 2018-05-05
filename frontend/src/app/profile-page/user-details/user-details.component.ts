import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserInfo } from '../../models/users/user-info';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  private userInfo: IUserInfo;

  constructor(private acRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.userInfo = this.acRoute.snapshot.data.object.userInfo;
  }

}
