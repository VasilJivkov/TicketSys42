import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IUserPageResponse } from '../models/responses/user-page-res';
import { ProfilePageService } from './profile-page.service';

@Injectable()
export class UserDetailsResolver implements Resolve<object> {

  constructor(private userService: ProfilePageService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): IUserPageResponse | Observable<IUserPageResponse> | Promise<IUserPageResponse> {
    const username = route.params.username;
    return this.userService.getUserInfo(username).map((res: IUserPageResponse) => res);
  }
}
