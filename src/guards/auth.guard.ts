import { ExecutionContext, CanActivate } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("Authentication Guard");
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}