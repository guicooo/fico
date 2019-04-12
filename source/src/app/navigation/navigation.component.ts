import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweenMax, Sine } from 'gsap';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  delaySecond: any = 0.4;
  constructor(
    public _router : Router,
    private appService: AppService
  ) { }

  ngOnInit() { 
      // $(window).scroll(function(){
      //   $(".logo-fico").css("width", 180 - $(window).scrollTop() / 3); 
      // });
      // this.animateLogo1();
      // this.animateLogo2();

  }


  animateLogo1() {
    if(this.appService.isDesktop()) {
      TweenMax.fromTo($('.effect-logo-1'), 1, {
        x: "20px",
        y: "20px",
        rotation: "-36deg",        
        alpha: 0
      }, {
        alpha: 1,
        x: "0px",
        y: "0px",
        rotation: "-36deg",
        ease: Sine.easeInOut,
        onComplete: () => {
          setTimeout(() => {
            TweenMax.to($('.effect-logo-1'), 0.5, {
              alpha: 0,
              x: "20px",
              y: "20px",
              delay: 1,
              onComplete: () => {
                // this.animateLogo1();  
              }
            });
          }, 1500);
        }
      });
    }
  }

  animateLogo2() {
    if(this.appService.isDesktop()) {
      TweenMax.fromTo($('.effect-logo-2'), 1, {
        x: "20px",
        y: "20px",
        rotation: "-22deg",        
        alpha: 0
      }, {
        alpha: 1,
        x: "15px",
        y: "5px",
        rotation: "-22deg",
        ease: Sine.easeInOut,
        delay: this.delaySecond,
        onComplete: () => {
          setTimeout(() => {
            TweenMax.to($('.effect-logo-2'), 0.5, {
              alpha: 0,
              x: "20px",
              y: "20px",
              onComplete: () => {
                // this.delaySecond = 0;
                // this.animateLogo2();  
              }
            });
          }, 1500);
        }
      });
    }
  }

}
