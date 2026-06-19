import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    _context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    void _context;
    return true; // TODO: implement JWT authentication and role-based access control
  }
}
