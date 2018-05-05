import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';
import { IDecodedToken } from '../models/users/DecodedToken';

@Injectable()
export class CompanyPageGuardService implements CanActivate {
  private user: IDecodedToken;

  constructor(private auth: AuthService) {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable < boolean > | Promise < boolean > {
    if (this.user.company === route.params.company) {
      return true;
    }
    return false;
  }
}
