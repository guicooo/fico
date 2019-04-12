import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-comp-inedita',
  templateUrl: './comp-inedita.component.html',
  styleUrls: ['./comp-inedita.component.scss']
})
export class CompIneditaComponent implements OnInit {

  public currentPage: number = 1;
  public editUser : boolean = false;
  public editAtivo;
  public currentInstrumentos: any[] = [];
  public indexAtivo: number;
  public vocal : boolean = false;
  public formacaoBanda : boolean = false;
  public arrayAluno = [];
  public arrayMusica = [];
  public arrayResumo = [];
  public arrayMp3 = [];
  file: File;
  public arrayPdf = [];
  public arrayBand = [
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false},
    {nome: '', rg: '', instrumentos: [''], actived: false}];

  public instrumentos = [
    {nome: 'vocal', link: 'vocal', actived: false},
    {nome: 'guitarra', link: 'guitar', actived: false},
    {nome: 'violão', link: 'violao', actived: false},
    {nome: 'baixo', link: 'baixo', actived: false},
    {nome: 'bateria', link: 'bateria', actived: false},
    {nome: 'percussão', link: 'percussao', actived: false},
    {nome: 'sopro', link: 'sopro', actived: false},
    {nome: 'teclado', link: 'teclado', actived: false}
  ];

  public aluno = new FormGroup({ 
    nome: new FormControl (null, [Validators.required, Validators.minLength(2)]),  
    unidade: new FormControl (null, Validators.required), 
    turma: new FormControl (null, Validators.required), 
    email: new FormControl (null, [Validators.required, Validators.email]),
    rg: new FormControl (null, [Validators.required, Validators.minLength(10)]),  
    telefone: new FormControl (null, Validators.required), 
  })
  public musica = new FormGroup({ 
    nome: new FormControl (null, [Validators.required, Validators.minLength(2)]),  
    artista: new FormControl (null, Validators.required)
  })   
  public integrante = new FormGroup({ 
    nome: new FormControl (null, [Validators.required, Validators.minLength(2)]),  
    rg: new FormControl (null, [Validators.required, Validators.minLength(10)]) 
  })   
  public resumo = new FormGroup({ 
    resumo: new FormControl (null, [Validators.required, Validators.minLength(2)]),  
  })    
  
  constructor(public router : Router, public toastr: ToastsManager, private _appService : AppService) { }

  ngOnInit() {
    this._appService.initMask();
  }
  
  addIntegrante(index){
    this._appService.initMask();
    this.currentInstrumentos = [];
    this.editUser = false;
    this.indexAtivo = index;    
    this.currentPage = 4;
    this.integrante.reset();
    this.instrumentos.forEach((x) => {
        x.actived = false
    })    
  }

  getInstrumento(item) {
    let hasVocal: boolean = false,
        objVocal: any;
    if(item.nome != 'vocal') 
    {
      if(!item.actived) {
        this.instrumentos.forEach((x) => {
          if(x.nome != 'vocal') {
            x.actived = false
            this.currentInstrumentos = [];
          } else {
            if(x.actived) {
              hasVocal = true;
              objVocal = x;
            }
          }
        })
      }
      
    }


    if(hasVocal)
      this.currentInstrumentos.push(objVocal.link);
    item.actived = !item.actived;    
    this.currentInstrumentos.push(item.link)
  }

  enviarIntegrante(){
    if(this.integrante.status === 'INVALID'){
      this.integrante.get('nome').markAsTouched() 
      this.integrante.get('rg').markAsTouched() 
    }else{
      if(this.instrumentos.filter(x => x.actived == true).length >= 2){
        this.vocal = true;
      }else{
        this.vocal = false;
      }
      let x = this.instrumentos.filter(x => x.actived == true);
      if(x.length == 0) {
        this.toastr.warning('Adicione um instrumento ao integrante.')
      } 
      else {
          if(!this.validarRg(this.integrante.value.rg)){
            this.arrayBand[this.indexAtivo] = {
              nome: this.integrante.value.nome, 
              rg: this.integrante.value.rg, 
              instrumentos: x.map(x => x.link),
              actived: true,
            };
            this.formacaoBanda = true;
            this.currentPage = 3;  
          }
      }
    }
    console.log(this.arrayBand);
  }  
  editIntegrante(item){
    this._appService.initMask();
    console.log(item);
    this.editUser = true;
    this.currentPage = 4;
    this.editAtivo = item;

    this.integrante.controls.nome.setValue(item.nome);
    this.integrante.controls.rg.setValue(item.rg);3
    let x = 0;
    for(let item of this.instrumentos)
    {
      item.actived = false;
      this.instrumentos[x] = item;
      x++      
    }

    for(let i = 0; i < this.editAtivo.instrumentos.length; i++){
        for(let x = 0; x < this.instrumentos.length; x++){
          if(this.editAtivo.instrumentos[i] == this.instrumentos[x].link){
            this.instrumentos[x].actived = true;
          }
      }
    }
    
  }

  editarIntegrante(){
    if(this.integrante.status === 'INVALID'){
      this.integrante.get('nome').markAsTouched() 
      this.integrante.get('rg').markAsTouched() 
    }else{
      if(this.instrumentos.filter(x => x.actived == true).length >= 2){
        this.vocal = true;
      }else{
        this.vocal = false;
      }
      let x = this.instrumentos.filter(x => x.actived == true);
      if(x.length == 0) {
        this.toastr.warning('Adicione um instrumento ao integrante.')
      } 
      else {
        let y : any = this.arrayBand.findIndex(x => x.rg == this.editAtivo.rg)
        if(this.integrante.value.rg == this.editAtivo.rg){
            this.arrayBand[y] = {
              nome: this.integrante.value.nome, 
              rg: this.integrante.value.rg, 
              instrumentos: x.map(x => x.link),
              actived: true,
            };
            this.formacaoBanda = true;
            this.currentPage = 3;  
        }else{
          if(!this.validarRg(this.integrante.value.rg)){
              this.arrayBand[y] = {
              nome: this.integrante.value.nome, 
              rg: this.integrante.value.rg, 
              instrumentos: x.map(x => x.link),
              actived: true,
            };
            this.formacaoBanda = true;
            this.currentPage = 3;  
          }
        }
      }
    console.log(this.arrayBand)
    }
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

  enviarMusica() {
    if(this.musica.status === 'INVALID'){
      this.musica.get('nome').markAsTouched() 
      this.musica.get('artista').markAsTouched() 
    }else{
      this.arrayMusica = [];
      this.arrayMusica.push({
        nome: this.musica.value.nome, 
        artista: this.musica.value.artista, 
      })
      this.currentPage = this.currentPage + 1
    }
    console.log(this.arrayMusica);
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
    if(this._appService.arrayMp3.length > 0)
      this.currentPage = this.currentPage + 1
      else
      this.toastr.warning('Por favor envie uma gravação.')
  }

  validarRg(rg : any) : boolean{
    let foundRg : boolean = false;
    for(let i = 0; i < this.arrayBand.length; i++)
    {
      if(this.arrayBand[i].rg == rg){
        this.toastr.warning('Rg já cadastrado.')
        foundRg = true;
        break;
      }else {
        foundRg = false;
      }
    }
    return foundRg;
  }


  next(){
    if(this.currentPage == 1){
      this.enviarAluno();
    }
    else if(this.currentPage == 2){
      this.enviarMusica();
    }
    else if(this.currentPage == 5){
      this.enviarResumo();
    }
    else if(this.currentPage == 7){
      this.enviarMp3();
    }else{
      this.currentPage = this.currentPage + 1
    }
  }
  back(){
    if(this.currentPage == 1){
      this.router.navigate(['/cadastro-de-bandas'])
    }
    if(this.currentPage == 5){
      this.currentPage = this.currentPage - 2;
    }else{
      this.currentPage = this.currentPage - 1;
    }
 
  }

}
