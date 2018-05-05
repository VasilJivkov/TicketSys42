import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable()
export class NotAuthGuardService implements CanActivate {

  constructor(private auth: AuthService) { }

  public canActivate(): boolean {
    return !!this.auth.isAuthenticated();
  }
}
