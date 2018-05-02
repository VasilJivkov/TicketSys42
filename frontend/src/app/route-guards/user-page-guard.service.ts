import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  AuthService
} from '../core/auth.service';
import {
  DecodedToken
} from '../models/users/DecodedToken';
import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class UserPageGuardService implements CanActivate {
  private user: DecodedToken;
  private requestedUsername: string;

  constructor(private auth: AuthService) {
    this.auth.user.subscribe((user: DecodedToken) => this.user = user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable < boolean > | Promise < boolean > {
    if (this.user.username === route.params.username || this.user.role === "Admin") {
      return true;
    }
    return false;
  }
}
