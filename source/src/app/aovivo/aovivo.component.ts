import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-aovivo',
  templateUrl: './aovivo.component.html',
  styleUrls: ['./aovivo.component.scss']
})
export class AovivoComponent implements OnInit {
  currentCpf: string;
  constructor(
    private _location: Location,
    private router: Router,
    private appService: AppService,
    public toastr: ToastsManager, 
    private elRef: ElementRef,
    vcr: ViewContainerRef
  ) {
    this.currentCpf = localStorage.getItem('cpfFICOLive');
    this.toastr.setRootViewContainerRef(vcr);
    
  }

  backClick() { 
    this._location.back(); 
  } 

  ngOnInit() {
    
    if(this.currentCpf == null) { // não tem CPF
      this.router.navigate(['/cadastroaovivo']);
      this.toastr.info('Para assistir, cadastre-se!');
    }else if(!this.appService.eventIsRunnig()) {
      // $('.modal.wait').modal('show');
      this.router.navigate(['/cadastroaovivo']);
      this.toastr.info('O evento será transmitido dia 02/09/2018 à partir das 15:00h.');
    } else {
      var myPlayer = $('vid1');
        console.log((<any>myPlayer).currentTechName());
        (<any>myPlayer).autoplay(true);
        (<any>myPlayer).controls(true);
        (<any>myPlayer).src({
            type: "application/vnd.ms-sstr+xml",
            src: "//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest"
        });
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
