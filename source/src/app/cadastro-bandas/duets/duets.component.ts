import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-duets',
  templateUrl: './duets.component.html',
  styleUrls: ['./duets.component.scss']
})
export class DuetsComponent implements OnInit {

  currentPage: number = 0;

  public arrayMp3 = [];
  file: File;
  public arrayPdf = [];
  arrayIntegrante: any[] = [];
  arrayIntegrantes: any[] = [];
  arrayResumo = [];
  editUser : boolean = false;
  editAtivo;

  public integrante = new FormGroup({ 
    nome: new FormControl (null, [Validators.required, Validators.minLength(2)]),  
    unidade: new FormControl (null, Validators.required), 
    turma: new FormControl (null, Validators.required), 
    email: new FormControl (null, [Validators.required, Validators.email]),
    rg: new FormControl (null, [Validators.required, Validators.minLength(10)]),  
    telefone: new FormControl (null, Validators.required),
  }) 
  public integrantes = new FormGroup({ 
    musica: new FormControl (null, Validators.required), 
    artista: new FormControl (null, Validators.required), 
  })   
  public resumo = new FormGroup({ 
    resumo: new FormControl (null, [Validators.required, Validators.minLength(2)]), 
  })

  constructor(public router : Router, public toastr: ToastsManager, public appService : AppService) { }

  ngOnInit() {
  }
  newIntegrante() {
    this.currentPage = this.currentPage + 1;
    this.integrante.reset();
    this.editUser = false;
    this.appService.initMask();
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
      this.currentPage = 0;  
      this.integrante.reset();
    }
    console.log(this.integrante)

  }
  editIntegrante(item){
    this.editUser = true;
    this.editAtivo = item;
    this.currentPage = 1;

    this.integrante.controls.nome.setValue(item.nome);
    this.integrante.controls.unidade.setValue(item.unidade);
    this.integrante.controls.turma.setValue(item.turma);
    this.integrante.controls.email.setValue(item.email);
    this.integrante.controls.rg.setValue(item.rg);
    this.integrante.controls.telefone.setValue(item.telefone);
  }
  editarIntegrante(){
    if(this.integrante.status === 'INVALID'){
      this.integrante.get('nome').markAsTouched() 
      this.integrante.get('unidade').markAsTouched() 
      this.integrante.get('turma').markAsTouched() 
      this.integrante.get('email').markAsTouched() 
      this.integrante.get('rg').markAsTouched() 
      this.integrante.get('telefone').markAsTouched() 
    }else{
        this.currentPage = 0;
        let x = this.arrayIntegrante.findIndex(x => x.rg == this.editAtivo.rg)
        this.arrayIntegrante[x] = {
          nome: this.integrante.value.nome, 
          unidade: this.integrante.value.unidade, 
          turma: this.integrante.value.turma, 
          email: this.integrante.value.email, 
          rg: this.integrante.value.rg, 
          telefone: this.integrante.value.telefone
        }

        this.editAtivo = this.arrayIntegrante[x];
      }
  }
  enviarIntegrantes(){
    if(this.integrantes.status === 'INVALID'){
      this.integrantes.get('musica').markAsTouched() 
      this.integrantes.get('artista').markAsTouched() 

    }else{
      this.arrayIntegrantes = []
      this.arrayIntegrantes.push({
        musica: this.integrantes.value.musica, 
        artista: this.integrantes.value.artista, 
        integrantes: this.arrayIntegrante
      })
      this.currentPage = this.currentPage + 2
      // this.currentPage = 0;  
      // this.integrante.reset();
    }
    console.log(this.arrayIntegrantes);
    
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
  enviarMusica(){
    if(this.appService.arrayMp3.length > 0)
      this.currentPage = this.currentPage + 1
      else
      this.toastr.warning('Por favor envie uma gravação.')
  }


  next(){
    if(this.currentPage == 0){
      this.enviarIntegrantes();
    }
    else if(this.currentPage == 2){
      this.enviarResumo();
    }
    else if(this.currentPage == 4){
      this.enviarMusica();
    }    
    else{
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
