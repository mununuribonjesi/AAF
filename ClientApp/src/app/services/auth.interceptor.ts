import {HttpEvent,HttpHandler,HttpInterceptor,HttpRequest} from "@angular/common/http";
import {Injectable, resolveForwardRef} from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor
{

        intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>
        {
            const token = localStorage.getItem("token");

            if(token)
            {
                const clone = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + token)
                });

                return next.handle(clone);
            }
           
            else 
            {
                return next.handle(req)
            }
        }
    
}