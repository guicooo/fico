import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cadastro-bandas',
  templateUrl: './cadastro-bandas.component.html',
  styleUrls: ['./cadastro-bandas.component.scss']
})
export class CadastroBandasComponent implements OnInit {
  public handler;
  public imagensDj: any[]  = [];
  public imagensComp: any[]  = [];
  public imagensDuets: any[]  = [];
  public imagensInterprete: any[]  = [];
  public imagensCover: any[]  = [];

  public imagemDj: number = 0;
  public imagemDuets: number = 0;
  public imagemInterprete: number = 0;
  public imagemComp: number = 0;
  public imagemCover: number = 0;

  constructor(public appService : AppService) {
    this.arrayImg(29, this.imagensDj, 'dj');
    this.arrayImg(24, this.imagensComp, 'composition');
    this.arrayImg(19, this.imagensCover, 'elvis');
    this.arrayImg(19, this.imagensInterprete, 'guita');
    this.arrayImg(19, this.imagensDuets, 'mic');
  }
  
  arrayImg(max : number, array : any, name : string){
    for(let i = 0; i < max; i++){
      array.push(`./assets/img/icons/animate/${name}/${name}_000${('0' + (i + 1)).slice(-2)}.png`)
    }
  }

  ngOnInit() {
    this.appService.arrayMp3 = [];
    $('.pngSequenceDj').hover(() => {
      this.handler = setInterval(() => {
        if(this.imagemDj + 1 >= this.imagensDj.length)
          this.imagemDj = 0
        else
          this.imagemDj = this.imagemDj + 1;
      }, 40);
    },
    () => {
      clearInterval(this.handler);
    })
    $('.pngSequenceComp').hover(() => {
      this.handler = setInterval(() => {
        if(this.imagemComp + 1 >= this.imagensComp.length)
          this.imagemComp = 0
        else
          this.imagemComp = this.imagemComp + 1;
      }, 40);
    },
    () => {
      clearInterval(this.handler);
    })      
    $('.pngSequenceDuets').hover(() => {
      this.handler = setInterval(() => {
        if(this.imagemDuets + 1 >= this.imagensDuets.length)
          this.imagemDuets = 0
        else
          this.imagemDuets = this.imagemDuets + 1;
      }, 40);
    },
    () => {
      clearInterval(this.handler);
    })  
    $('.pngSequenceInterprete').hover(() => {
      this.handler = setInterval(() => {
        if(this.imagemInterprete + 1 >= this.imagensInterprete.length)
          this.imagemInterprete = 0
        else
          this.imagemInterprete = this.imagemInterprete + 1;
      }, 40);
    },
    () => {
      clearInterval(this.handler);
    })    
    $('.pngSequenceCover').hover(() => {
      this.handler = setInterval(() => {
        if(this.imagemCover + 1 >= this.imagensCover.length)
          this.imagemCover = 0
        else
          this.imagemCover = this.imagemCover + 1;
      }, 50);
    },
    () => {
      clearInterval(this.handler);
    })  
               
  }



}