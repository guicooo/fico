import { Component, OnInit, ViewContainerRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { CadastroAoVivoService } from './cadastro-ao-vivo.service';
import * as crypto from 'crypto-js';
import { ToastsManager } from 'ng2-toastr';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { TweenMax, Sine } from 'gsap';

@Component({
  selector: 'app-cadastro-ao-vivo',
  templateUrl: './cadastro-ao-vivo.component.html',
  styleUrls: ['./cadastro-ao-vivo.component.scss']
})
export class CadastroAoVivoComponent implements OnInit, AfterViewInit {
  formSubscription: FormGroup;
  formAlreadyHasRegister: FormGroup;
  cpf: string = '';
  cpfAlready: string = '';
  nome: string = '';
  sobrenome: string = '';
  nascimento: string = '';
  celular: string = '';
  estuda: string = '';
  mail: string = '';  
  validCpf: boolean = false;
  loadingCpfData: boolean = false;
  loadingSubmit: boolean = false;
  cadastroOk : boolean = false;
  
  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private cadastroAoVivoService: CadastroAoVivoService,
    private http: Http,
    private router: Router,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.formSubscription = this.formBuilder.group({
      CPF: [this.cpf, [Validators.required, Validators.minLength(14)]],
      Nome: [this.nome, [Validators.required, Validators.minLength(2)]],
      Sobrenome: [this.sobrenome, [Validators.required, Validators.minLength(2)]],
      DataNascimento: [this.nascimento, [Validators.required, Validators.minLength(10)]],
      Celular: [this.celular, [Validators.required, Validators.minLength(14)]],
      InstitutoEnsino: [this.estuda, [Validators.required, Validators.minLength(2)]],
      Email: [this.mail, [Validators.required, Validators.email]]
    });

    this.formAlreadyHasRegister = this.formBuilder.group({
      CPF: [this.cpfAlready, [Validators.required, Validators.minLength(14)]]
    });

    $('#cpf').eq(0).focus();  
    

  }
  ngAfterViewInit() {
    // Máscaras dos campos do formulário
    (<any>$('#cpf')).mask('000.000.000-00'); 
    (<any>$('#nascimento')).mask('00/00/0000');
    (<any>$('#celular')).mask('(00) 00000-0009');
    (<any>$('#celular')).blur((e) => {
      let number: any = $('#celular').val();
      if(number.length == 15){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
        (<any>$('#celular')).mask('(00) 00000-0009');
      } else {
        (<any>$('#celular')).mask('(00) 0000-00009');
      }
    });
    
  }
  onSubmit() {
    if (this.formSubscription.valid) { // formulário válido

      // Removendo caracteres especiais para enviar ao serviço
      this.formSubscription.value.CPF = this.cpf.replace(/\D/g, '');
      this.formSubscription.value.Celular = this.celular.replace(/\D/g, '');

      // Requisitando serviço de cadastro de usuário
      this.cadastrarUsuario(this.formSubscription.value)
        .subscribe(data => {});
        

    } else { // formulário inválido
           
      $('input.ng-invalid').eq(0).focus();
      this.toastr.warning('Existem campos inválidos.');
      // Setando campos inválidos como inválidos
      this.appService.verificaValidacoesForm(this.formSubscription);
    }
  }

  onSubmitAlready() {
    if (this.formAlreadyHasRegister.valid) { // formulário válido

      // Removendo caracteres especiais para enviar ao serviço
      this.formAlreadyHasRegister.value.CPF = this.cpfAlready.replace(/\D/g, '');

      // Requisitando serviço de cadastro de usuário
      this.checkAlreadyRegister(this.formAlreadyHasRegister.value.CPF)
        .subscribe(data => {});

    } else { // formulário inválido
      $('.modal.already input.ng-invalid').eq(0).focus();
      this.toastr.warning('Insira o seu CPF corretamente.');
      // Setando campos inválidos como inválidos
      this.appService.verificaValidacoesForm(this.formAlreadyHasRegister);
    }
  }

  openModalCpf() {
    $('.modal.already').modal('show');
    setTimeout(() => {
      $('#cpf').eq(1).focus();
      (<any>$('.modal.already #cpf')).mask('000.000.000-00'); 
    }, 1000);
  }

  cpfBlur(value) {
    let cpfOnlyNumbers = value.replace(/\D/g, '');
    if(cpfOnlyNumbers.length == 11) { // campo CPF preenchido
      
      this.consultarCPF(cpfOnlyNumbers)
        .subscribe(data => {
        });
      
    }
  }

  // effectPlay() {
  //   TweenMax.fromTo($('svg.play-icon'), 0.4, {
  //     scale: 1,
  //     x: '0px'
  //   }, {
  //     scale: 0.8,
  //     x: '-25px',
  //     ease: Sine.easeInOut,
  //     // delay: 1.5,
  //     onComplete: () => {
  //       TweenMax.to($('svg.play-icon'), 0.5, {
  //         scale: 1,
  //         x: '15px'
  //       });
  //     }
      
  //   });
  // }

  bestNumber(arrDdd, arrNumber) {
    var indexBest = null;

    console.log(arrNumber)

    if(arrNumber.length > 0) {
      for(let i = 0; i < arrNumber.length; i++) {
        if(arrNumber[i].length == 9) { // o primeiro é celular
          indexBest = i;
          i = arrNumber.length - 1; // forçando a finalização do laço "for"
        }
      }
  
      if(indexBest == null) { // não achou nenhum celular, então pega o último número fixo
        indexBest = 0;
      }

      return `(${arrDdd[indexBest]}) ${arrNumber[indexBest].replace(/(?=.{4}$)/,'-')}`;
    } 

    return '';
  }

  consultarCPF(cpf: string) {
    this.loadingCpfData = true;
    var _headers =  new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'chavePublica': this.appService.authAccess,
        'chaveAcesso': 'f5e0f96e-90ce-4d40-af69-954adb08aa00'
    });
    var _requestOptions = new RequestOptions({headers: _headers});
    return this.http.get(`${this.appService.baseUrlService}ParticipanteFico/ConsultarCPF?CPF=${cpf}`, _requestOptions)
                .map(res => {
                  this.loadingCpfData = false;
                  let data: any = JSON.parse(res['_body']);

                  console.log(data)
                  let dados = data.DadosPF.DadosCadastrais;

                  if(dados) { // achou CPF
                    this.validCpf = true;
                    this.nome = dados.Nome.split(/ (.+)/)[0]; // pega a primeira palavra da string
                    this.sobrenome = dados.Nome.split(/ (.+)/)[1]; // pega o restante da palavra
        
                    let n = dados.Idade.split(" "); 
                    n = n[n.length - 1]; // pega apenas a data de nascimento
                    
                    this.nascimento = n;
                    
                    
                  } else {
                    
                  }
                })
                .catch(dados => this.handleErrorFromApi(dados._body));
  }

  handleErrorFromApi(error: Response) {
    this.loadingCpfData = false;
    this.loadingSubmit = false;
    let err: any = error;
    let notificacoes = JSON.parse(err);
    notificacoes = notificacoes.notificacoes;
    for(let i = 0; i < notificacoes.length; i++) {
      this.toastr.warning(notificacoes[i].mensagem);
    }
    if (error.status == 500) {      
      
    } else {
      return Observable.throw(error);
    }
  }

  cadastrarUsuario(obj: any){
    obj = this.appService.tratarObjeto(obj);
    this.loadingSubmit = true;
    var _headers =  new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'chavePublica': this.appService.authAccess
    });
    var _requestOptions = new RequestOptions({headers: _headers});
    return this.http.post(`${this.appService.baseUrlService}ParticipanteFico`, obj, _requestOptions)
                .map(res => {
                  console.log(res);
                  this.loadingSubmit = false;
                  // Criptografar CPF com a chave de acesso que vem do AppService
                  let userCpfEncrypted = crypto.AES.encrypt(this.formSubscription.value.CPF, this.appService.keyToEncrypt);
                  localStorage.setItem('cpfFICOLive', userCpfEncrypted.toString());

                  setTimeout(() => {
                    // Decrypt
                    let bytes  = crypto.AES.decrypt(userCpfEncrypted.toString(), this.appService.keyToEncrypt);
                    let cpfDecrypted = bytes.toString(crypto.enc.Utf8); // access key system
                    // console.log('cpfdecrypted', cpfDecrypted);
                  }, 1000);

                  if(this.appService.eventIsRunnig()) { // o evento é hoje
                    $('.modal-backdrop').removeClass('show').hide();
                    this.router.navigate(['/aovivo']);
                  } else {
                    
                    this.cadastroOk = !this.cadastroOk;
                  }

                  
                })
                .catch(dados => this.handleErrorFromApi(dados._body));
  }

  checkAlreadyRegister(cpfAlready: any){
    this.loadingSubmit = true;
    var _headers =  new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'chavePublica': this.appService.authAccess
    });
    var _requestOptions = new RequestOptions({headers: _headers});
    return this.http.get(`${this.appService.baseUrlService}ParticipanteFico?cpf=${cpfAlready}`, _requestOptions)
                .map(res => {
                  this.loadingSubmit = false;
                  // // Criptografar CPF com a chave de acesso que vem do AppService
                  let userCpfEncrypted = crypto.AES.encrypt(this.formAlreadyHasRegister.value.CPF, this.appService.keyToEncrypt);
                  localStorage.setItem('cpfFICOLive', userCpfEncrypted.toString());

                  setTimeout(() => {
                    // Decrypt
                    let bytes  = crypto.AES.decrypt(userCpfEncrypted.toString(), this.appService.keyToEncrypt);
                    let cpfDecrypted = bytes.toString(crypto.enc.Utf8); // access key system
                    // console.log('cpfdecrypted', cpfDecrypted);
                  }, 1000);
                  if(this.appService.eventIsRunnig()) { // o evento é hoje
                    $('.modal-backdrop').removeClass('show').hide();
                    $('.modal.already').modal('hide');
                    this.router.navigate(['/aovivo']);
                  } else {
                    // $('.modal.wait').modal('show');
                    $('.modal.already').modal('hide');
                    this.cadastroOk = !this.cadastroOk;
                  }
                  
                })
                .catch(dados => this.handleErrorFromApi(dados._body));
  }

}
