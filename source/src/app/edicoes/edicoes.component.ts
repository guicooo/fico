import { Component, OnInit, HostListener } from '@angular/core';
import { TweenMax, Sine } from 'gsap';

@Component({
  selector: 'app-edicoes',
  templateUrl: './edicoes.component.html',
  styleUrls: ['./edicoes.component.scss']
})
export class EdicoesComponent implements OnInit {
  fico47Items: any = [];
  fico47Limit: number = 0; 
  fico47Max: number = 99; 

  fico46Items: any = [];
  fico46Limit: number = 0; 
  fico46Max: number = 96; 

  fico45Items: any = [];
  fico45Limit: number = 0; 
  fico45Max: number = 1207; 

  fico44Items: any = [];
  fico44Limit: number = 0; 
  fico44Max: number = 1836; 

  constructor() {
    this.fillImagesArrayFico47();
    this.fillImagesArrayFico46();
    this.fillImagesArrayFico45();
    this.fillImagesArrayFico44();

    
  }

  ngOnInit() {
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
      }
    });
    
    $('.overlay').fadeOut('fast');
  }

  seeMore(edicao) {
    switch (edicao) {
      case 47:
        this.fillImagesArrayFico47();
        break;      
      case 46:
        this.fillImagesArrayFico46();
        break;
      case 45:
        this.fillImagesArrayFico45();
        break; 
      case 44:
        this.fillImagesArrayFico44();
        break;     
    }
    
  }
  
  fillImagesArrayFico47() {
    this.fico47Items = [];
    this.fico47Limit += 6;
    
    for(let i = 1; i <= this.fico47Limit; i++) {     
      if(i <= this.fico47Max) {
        this.fico47Items.push(i);
      }
    }
  }

  fillImagesArrayFico46() {
    this.fico46Items = [];
    this.fico46Limit += 6;
    
    for(let i = 1; i <= this.fico46Limit; i++) {     
      if(i <= this.fico46Max) {
        this.fico46Items.push(i);
      }
    }
  }

  fillImagesArrayFico45() {
    this.fico45Items = [];
    this.fico45Limit += 6;
    
    for(let i = 1; i <= this.fico45Limit; i++) {     
      if(i <= this.fico45Max) {
        this.fico45Items.push(i);
      }
    }
  }

  fillImagesArrayFico44() {
    this.fico44Items = [];
    this.fico44Limit += 6;
    
    for(let i = 1; i <= this.fico44Limit; i++) {     
      if(i <= this.fico44Max) {
        this.fico44Items.push(i);
      }
    }
  }

}
