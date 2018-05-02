import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserPageService } from "./user-page.service";
import { Injectable } from "@angular/core";
import { UserPageResponse } from "../models/responses/user-page-res";

@Injectable()
export class UserDetailsResolver implements Resolve<Object> {

  constructor(private userService: UserPageService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserPageResponse | Observable<UserPageResponse> | Promise<UserPageResponse> {
    const username = route.params['username'];
    return this.userService.getUserInfo(username).map((res: UserPageResponse) => res);
  }
}