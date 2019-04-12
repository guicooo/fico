import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-dj',
  templateUrl: './dj.component.html',
  styleUrls: ['./dj.component.scss']
})
export class DjComponent implements OnInit {

  currentPage: number = 1;
  public arrayAluno = [];
  public arrayResumo = [];

  public aluno = new FormGroup({ 
    nome: new FormControl (null, [Validators.required, Validators.minLength(2)]),  
    unidade: new FormControl (null, Validators.required), 
    turma: new FormControl (null, Validators.required), 
    email: new FormControl (null, [Validators.required, Validators.email]),
    rg: new FormControl (null, [Validators.required, Validators.minLength(10)]), 
    telefone: new FormControl (null, Validators.required), 
  })
  public resumo = new FormGroup({ 
    resumo: new FormControl (null, Validators.required),
    estilo: new FormControl (null, Validators.required)
  })    

  constructor(public router : Router, public appService : AppService) { }

  ngOnInit() {
    this.appService.initMask();
  }

  enviarAluno(){
    if(this.aluno.status === 'INVALID'){
      this.aluno.get('nome').markAsTouched() 
      this.aluno.get('unidade').markAsTouched() 
      this.aluno.get('turma').markAsTouched() 
      this.aluno.get('email').markAsTouched() 
      this.aluno.get('rg').markAsTouched() 
      this.aluno.get('telefone').markAsTouched() 
    }else{
      this.arrayAluno = [];
      this.arrayAluno.push({
        nome: this.aluno.value.nome, 
        unidade: this.aluno.value.unidade, 
        turma: this.aluno.value.turma, 
        email: this.aluno.value.email, 
        rg: this.aluno.value.rg, 
        telefone: this.aluno.value.telefone
      })
      this.currentPage = this.currentPage + 1
    }
    console.log(this.arrayAluno);
  }  

  enviarResumo(){
    if(this.resumo.status === 'INVALID'){
      this.resumo.get('resumo').markAsTouched() 
      this.resumo.get('estilo').markAsTouched() 
    }else{
      this.arrayResumo = [];
      this.arrayResumo.push({
        resumo: this.resumo.get('resumo').value, 
        estilo: this.resumo.get('estilo').value, 
      })
      this.currentPage = this.currentPage + 1
    }
    console.log(this.arrayResumo);
  }




  next(){
    if(this.currentPage == 1){
      this.enviarAluno();
    }
    else if(this.currentPage == 2){
      this.enviarResumo();
    }else{
      this.currentPage = this.currentPage + 1
    }
  }
  back(){
    if(this.currentPage == 1){
      this.router.navigate(['/cadastro-de-bandas'])
    }else{
      this.currentPage = this.currentPage - 1;
    }
 
  }
  
}
