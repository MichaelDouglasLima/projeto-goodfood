import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    // URLs ou padrões que não devem incluir o token
    const excludedUrls = [
      '/api/login',         // URL de login que não precisa de autenticação
      '/api/signup'         // URL de registro de usuário
    ];

    // Verificar se a URL da requisição está na lista de exclusões
    const shouldAddToken = !excludedUrls.some(url => req.url.includes(url));

    if (shouldAddToken && authToken) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
    }

    console.log('O Token foi Adicionado na Requisição');
    return next.handle(req);
  }
  
}
