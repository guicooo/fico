import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-interprete',
  templateUrl: './interprete.component.html',
  styleUrls: ['./interprete.component.scss']
})
export class InterpreteComponent implements OnInit {

  currentPage: number = 0;
  arrayMusica = [];
  arrayIntegrante = [];
  arrayResumo = [];
  file: File;
  public arrayPdf = [];
  public arrayMp3 = [];

  public musica = new FormGroup({ 
    musica: new FormControl (null, Validators.required), 
    artista: new FormControl (null, Validators.required),
  }) 
  public integrante = new FormGroup({ 
    nome: new FormControl (null, [Validators.required, Validators.minLength(2)]),  
    unidade: new FormControl (null, Validators.required), 
    turma: new FormControl (null, Validators.required), 
    email: new FormControl (null, [Validators.required, Validators.email]),
    rg: new FormControl (null, [Validators.required, Validators.minLength(10)]), 
    telefone: new FormControl (null, Validators.required),
  }) 
  public resumo = new FormGroup({ 
    resumo: new FormControl (null, [Validators.required, Validators.minLength(2)]), 
  })

  constructor(private router : Router, public toastr: ToastsManager, public appService : AppService) { }

  ngOnInit() {
 
  }

  enviarMusica(){
    if(this.musica.status === 'INVALID'){
      this.musica.get('musica').markAsTouched()
      this.musica.get('artista').markAsTouched() 
    }else{
      this.arrayMusica = [];
      this.arrayMusica.push({
        musica: this.musica.get('musica').value, 
        artista: this.musica.get('artista').value, 
      })
      this.currentPage = this.currentPage + 1
    }
    console.log(this.arrayMusica);
  }
  enviarIntegrante(){
    if(this.integrante.status === 'INVALID'){
      this.integrante.get('nome').markAsTouched() 
      this.integrante.get('unidade').markAsTouched() 
      this.integrante.get('turma').markAsTouched() 
      this.integrante.get('email').markAsTouched() 
      this.integrante.get('rg').markAsTouched() 
      this.integrante.get('telefone').markAsTouched() 
    }else{
      this.arrayIntegrante.push({
        nome: this.integrante.value.nome, 
        unidade: this.integrante.value.unidade, 
        turma: this.integrante.value.turma, 
        email: this.integrante.value.email, 
        rg: this.integrante.value.rg, 
        telefone: this.integrante.value.telefone
      })
      this.currentPage = this.currentPage + 1;  
      this.integrante.reset();
    }
    console.log(this.arrayIntegrante)

  }
  enviarResumo(){
    if(this.resumo.status === 'INVALID'){
      this.resumo.get('resumo').markAsTouched() 
    }else{
      this.arrayResumo = [];
      this.arrayResumo.push({
        resumo: this.resumo.get('resumo').value, 
      })
      this.currentPage = this.currentPage + 1
    }
    console.log(this.arrayResumo);
  }

  
  readPdf(event: any){
    this.file = event.target.files[0];
    if(this.file.name.toLowerCase().indexOf('.pdf') > -1) {
        // this.namePdf = "Arquivo selecionado: " + this.file.name;
        this.arrayPdf=[];
        this.arrayPdf.push({
            Name: this.file.name,
            Type: this.file.type,
            Value: event.target.value
          }) 
    } else {
      this.toastr.warning('Arquivo com formato inválido.')
    }
  console.log(this.arrayPdf);
  }
  
  enviarMp3(){
    if(this.appService.arrayMp3.length > 0)
      this.currentPage = this.currentPage + 1
      else
      this.toastr.warning('Por favor envie uma gravação.')
  }  

  next(){
    if(this.currentPage == 0){
      this.enviarMusica();      
      this.appService.initMask();
    }
    else if(this.currentPage == 1){
      this.enviarIntegrante()
    }
    else if(this.currentPage == 2){
      this.enviarResumo();
    }
    else if(this.currentPage == 4){
      this.enviarMp3();
    } else{
      this.currentPage = this.currentPage + 1
    }
  }
  back(){
    if(this.currentPage == 0){
      this.router.navigate(['/cadastro-de-bandas'])
    }
    else if(this.currentPage == 2){
      this.currentPage = this.currentPage - 2;
    }else{
      this.currentPage = this.currentPage - 1;
    }
 
  }  
}
