import { Component, OnInit, OnDestroy, AfterViewInit, ViewContainerRef, HostListener } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppService } from '../app.service';
import { TweenMax, Sine } from 'gsap';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit, AfterViewInit {
    loginInfo: any;
	// private usuario: Usuario = new Usuario();
    formSubscription: FormGroup;
    cpf: string = '';
    telefone: string = ''; 
    nome: string = ''; 
    email: string = '';
    rg: string = '';    
    resposta: string = '';    
    modalTitle: string = '';
    modalText: string = '';
    cadastro : boolean = true;
    validCpf: boolean = false;
    checkBoxChecked: boolean = false;
    loadingSubmit: boolean= false;
    cadastroOk : boolean = false;



    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private http: Http,
        private formBuilder: FormBuilder,
        private appComponent: AppComponent,
        private appService: AppService,
        public toastr: ToastsManager, 
        vcr: ViewContainerRef) {
            this.toastr.setRootViewContainerRef(vcr);
    }

    fazerCadastro() {
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if(event.keyCode === 27) { // pressionou a tecla ESC
            this.closeModal();
        }
    }

    ngOnInit() {
        this.formSubscription = this.formBuilder.group({
            Celular: [this.telefone, [Validators.required, Validators.minLength(14)]],
            Cpf: [this.cpf, [Validators.required, Validators.minLength(14)]],
            Email: [this.email, [Validators.required, Validators.email]],
            Rg: [this.rg, [Validators.required, Validators.minLength(11)]],            
            Resposta: [this.resposta, [Validators.required, Validators.minLength(1)]]            
        });
    }

    ngAfterViewInit() {
        this.maskFields()
    }

    onSubmit() {
        if (this.formSubscription.valid && this.validCpf) {
            if(!this.checkBoxChecked) { // verifica se o checkbox está checkado
                this.modalTitle = 'Aviso';
                this.modalText = 'Para prosseguir, é necessário ler e estar de acordo com as regras estabelecidas.';
                $('.modal').modal('show');
            } else {
                // Removendo caracteres especiais para enviar ao serviço
                this.formSubscription.value.Cpf = this.cpf.replace(/\D/g, '');
                this.formSubscription.value.Rg = this.rg.replace(/\D/g, '');
                this.formSubscription.value.Celular = this.telefone.replace(/\D/g, '');

                // Requisitando serviço de cadastro de usuário
                this.cadastrarUsuario(this.formSubscription.value)
                    .subscribe(data => {});
            }            
        } else { // formulário inválido
            // $('#loginFormModal').modal('show');
            if(!this.validCpf) {
                $('#cpf').focus();
            }
            $('input.ng-invalid').eq(0).focus();
            
            this.appService.verificaValidacoesForm(this.formSubscription);
        }
    }

    cpfBlur(value) {
        let cpfOnlyNumbers = value.replace(/\D/g, '');
        if(cpfOnlyNumbers.length == 11) { // campo CPF preenchido
          
          this.consultarCPF(cpfOnlyNumbers)
            .subscribe(data => {
            });
          
        }
    }

    checkBoxData() {
        this.checkBoxChecked = !this.checkBoxChecked;
    }

    // effectPlay() {
    //     TweenMax.fromTo($('svg.play-icon'), 0.4, {
    //       scale: 1,
    //       x: '0px'
    //     }, {
    //       scale: 0.8,
    //       x: '-25px',
    //       ease: Sine.easeInOut,
    //       // delay: 1.5,
    //       onComplete: () => {
    //         TweenMax.to($('svg.play-icon'), 0.5, {
    //           scale: 1,
    //           x: '15px'
    //         });
    //       }
          
    //     });
    // }

    openModalRules() {
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

    consultarCPF(cpf: string) {        
        this.validCpf = false;
        var _headers =  new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'chavePublica': this.appService.authAccess,
            'chaveAcesso': 'f5e0f96e-90ce-4d40-af69-954adb08aa00'
        });
        var _requestOptions = new RequestOptions({headers: _headers});
        return this.http.get(`${this.appService.baseUrlService}ParticipanteFico/ConsultarCPF?CPF=${cpf}`, _requestOptions)
                    .map(res => {                      
                      let data: any = JSON.parse(res['_body']);
    
                      console.log(data)
                      let dados = data.DadosPF.DadosCadastrais;
    
                      if(dados) { // achou CPF
                        this.validCpf = true;
                        this.nome = dados.Nome;
                      } else {
                        
                      }
                    })
                    .catch(dados => this.handleErrorFromApi(dados._body));
    }

    cadastrarUsuario(obj: any){
        obj = this.appService.tratarObjeto(obj);
        this.loadingSubmit = true;
        var _headers =  new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'chavePublica': this.appService.authAccess
        });
        var _requestOptions = new RequestOptions({headers: _headers});
        return this.http.post(`https://www.objetivo.br/Fico/`, obj, _requestOptions)
                    .map(res => {                       
                        this.loadingSubmit = false;

                        let data = JSON.parse(res['_body'])

                        if(data.erro) {
                            this.toastr.warning(data.erro);
                        } else {
                            this.checkBoxChecked = false;
                            this.cadastro = !this.cadastro;
                        }
    
                        // this.modalTitle = 'Cadastro';
                        // this.modalText = 'Seu cadastro no sorteio foi efetuado com sucesso!';
                        // $('.modal').modal('show');
                      
                    })
                    .catch(dados => this.handleErrorFromApi(dados._body));
    }


    confirmRegister() {
        this.confirmRegisterService()
        .subscribe(data => {});
        this.cadastroOk = !this.cadastroOk;
    }

    confirmRegisterService() {
        let obj = this.appService.tratarObjeto({'id': 'test'});
        this.loadingSubmit = true;
        var _headers =  new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'chavePublica': this.appService.authAccess
        });
        var _requestOptions = new RequestOptions({headers: _headers});
        return this.http.post(`https://www.objetivo.br/Fico/Home/Confirmar`, obj, _requestOptions)
                    .map(res => {      
                        let data = JSON.parse(res['_body'])

                        if(data.erro) {
                            this.toastr.warning(data.erro);
                        } else {                     
                            let firstName = this.nome.split(/ (.+)/)[0]; // pega a primeira palavra da string       
                            this.modalTitle = 'Cadastro';
                            this.modalText = `${firstName}, seu cadastro no sorteio foi efetuado com sucesso!`;
                            $('.modal').modal('show');
                        }
    
                      
                    })
                    .catch(dados => this.handleErrorFromApi(dados._body));
    }

    handleErrorFromApi(error: Response) {
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

    maskFields() {
        // Máscaras dos campos do formulário
        (<any>$('#cpf')).mask('000.000.000-00'); 
        (<any>$('#rg')).mask("00.000.000-A"); 
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
    
}
