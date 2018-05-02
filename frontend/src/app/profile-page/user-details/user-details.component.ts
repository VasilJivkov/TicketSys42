import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../models/users/user-info';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  private userInfo: UserInfo;

  constructor(private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userInfo = this.acRoute.snapshot.data['object'].userInfo;
  }

}
