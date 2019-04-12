import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Injectable()
export class CadastroAoVivoService {
  loadingCpfData: boolean = false;

  constructor(
    private appService: AppService,
    private http: Http
  ) {
  }
  
  


  
  
  handleErrorFromApi(error: Response) {
    this.loadingCpfData = false;
    console.log(error);
    let err: any = error;
    let notificacoes = JSON.parse(err);
    // this.toastr.info('Nenhum resultado encontrado');
    if (error.status == 500) {      
      // this.router.navigate(['/login']);
    } else {
      return Observable.throw(error);
    }
  }
	
}
