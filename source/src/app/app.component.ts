import { Component, OnInit, RootRenderer, ViewContainerRef } from '@angular/core';
import 'rxjs/Rx';
import { AppService } from './app.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TweenMax, Linear } from 'gsap';

declare var $: any

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public imagensDj: any[]  = [];
  public imagensComp: any[]  = [];
  public imagensDuets: any[]  = [];
  public imagensInterprete: any[]  = [];
  public imagensCover: any[]  = [];
  
  public instrumentos = [
    {link: 'vocal'},
    {link: 'guitar'},
    {link: 'violao'},
    {link: 'baixo'},
    {link: 'bateria'},
    {link: 'percussao'},
    {link: 'sopro'},
    {link: 'teclado'}
  ];
  public listImg = [
    {link: 'composicao'},
    {link: 'cover'},
    {link: 'dj'},
    {link: 'duets'},
    {link: 'interprete'}
  ];  


  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    public router: Router,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    $(window).on("resize", function () {
      if ($(this).width() < 991) {
          appService.isMobile = true;
      } else {
          appService.isMobile = false;
      }
    })
    if ($(window).width() < 991) {
      appService.isMobile = true;
  } else {
      appService.isMobile = false;
  }  
  this.arrayImg(29, this.imagensDj, 'dj');
  this.arrayImg(24, this.imagensComp, 'composition');
  this.arrayImg(19, this.imagensCover, 'elvis');
  this.arrayImg(19, this.imagensInterprete, 'guita');
  this.arrayImg(19, this.imagensDuets, 'mic');  
	}

	ngOnInit() {
    this.effectBgHome();
  }
  arrayImg(max : number, array : any, name : string){
    for(let i = 0; i < max; i++){
      array.push(`./assets/img/icons/animate/${name}/${name}_000${('0' + (i + 1)).slice(-2)}.png`)
    }
  }

  effectBgHome() {
    TweenMax.fromTo($('.bg-login'), 15, {
      scale: "1"
    }, {
      scale: "1.2",
      ease: Linear.easeInOut,
      onComplete: () => {
        TweenMax.fromTo($('.bg-login'), 15, {
          scale: "1.2"
        }, {
          scale: "1",
          ease: Linear.easeInOut,
          // delay: 1.5,
          onComplete: () => {
            this.effectBgHome();
          }
          
        });
      }
      
    });
  }

  
}
