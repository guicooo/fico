import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TweenMax, Sine } from 'gsap';
import { AppService } from '../app.service';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.scss']
})
export class InformacoesComponent implements OnInit {
  private future: Date;
  private futureString: string;
  private counter$: Observable<number>;
  private subscription: Subscription;
  public message: string;
  textTimer: string = 'Faltam';
  isToday: boolean = false;  
  eventFinished: boolean = false;
  isNotToday: boolean = true;
  constructor(public appService: AppService) {
    this.futureString = 'September 02, 2018 15:00:00';
  }

  ngOnInit() {
    this.future = new Date(this.futureString);
    this.counter$ = Observable.interval(1000).map((x) => {
       return Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
    });

    this.subscription = this.counter$.subscribe((x) => {
      this.message = this.dhms(x)
      var days, hours, minutes, seconds;
      days = Math.floor(x / 86400);
      x -= days * 86400;
      hours = Math.floor(x / 3600) % 24;
      x -= hours * 3600;
      minutes = Math.floor(x / 60) % 60;
      x -= minutes * 60;
      seconds = x % 60;
      
      // if(days == 1) {
      //   // alert('é hoje');
      //   this.textTimer = 'Falta';
      // }
      // if(days == 0 && hours < 15) {
      //   // alert('é hoje');
      //   this.isToday = true;
      // } else if(days <= 0 && hours >= 15) {
      //   this.eventFinished = true;
      // }
    });

    $(window).scroll(() => {
      var scroll = $(window).scrollTop();
      $(".arrow").css("opacity", 1 - $(window).scrollTop() / 300); 

      if(scroll > 500) {
        this.animaLeft(".atracoes", ".animaLeft"); 
        this.animaTxT(".atracoes", ".animaTxt"); 
      }
      if(scroll > 1343) {
        this.animaLeft(".premios", ".animaLeft"); 
        this.animaTxT(".premios", ".animaTxt"); 
      }   
      if(scroll > 2143) {
        this.animaLeft(".realizacao", ".animaLeft"); 
        this.animaTxT(".realizacao", ".animaTxt"); 
      }        
      
    
     
      var newWindowWidth = $(window).width();
      if (newWindowWidth < 767) { 
        if(scroll > 290) {
          this.animaLeft(".atracoes", ".animaLeft"); 
          this.animaTxT(".atracoes", ".animaTxt"); 
        }
        if(scroll > 740) {
          this.animaLeft(".premios", ".animaLeft"); 
          this.animaTxT(".premios", ".animaTxt"); 
        }   
        if(scroll > 1665) {
          this.animaLeft(".realizacao", ".animaLeft"); 
          this.animaTxT(".realizacao", ".animaTxt"); 
        }  
      } 
     });
    


 
  }


  animaLeft(father, chield){
    $(father).find(chield).css("opacity", 1);
    $(father).find(chield).css("transform", "translate(0,0)");      
 
  }
  animaTxT(father, chield){
    $(father).find(chield).css("opacity", 1);
  }  

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.keyCode === 27) { // pressionou a tecla ESC
        this.closeModal();
    }
  }

  showModal(imageSrc) {
    $('.image-lightbox').attr('src', imageSrc)
    // $('.at-modal').show();
    TweenMax.fromTo($('.at-modal'), 0.5, {
      display: "none",
      x: "150px",
      y: "-50%",
      alpha: 0
    }, {
      display: "block",
      alpha: 1,
      x: "-50%",
      y: "-50%",
      ease: Sine.easeInOut,
      // delay: 1.5,
      onComplete: () => {
      }
    });
    $('.overlay').fadeIn('fast');    
  }

  closeModal() {
    // $('.at-modal').hide();    
    TweenMax.fromTo($('.at-modal'), 0.35, {
      x: "-50%",
      y: "-50%",
      alpha: 1
    }, {
      alpha: 0,
      x: "150px",
      y: "-50%",
      ease: Sine.easeInOut,
      // delay: 1.5,
      onComplete: () => {
        $('.at-modal').hide();
        this.appService.modalWasClosed = true;
      }
    });
    
    $('.overlay').fadeOut('fast');
  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    

    return [
        days + 'D',
        hours + 'H',
        minutes + 'M',
        seconds + 'S'
    ].join(' : ');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
