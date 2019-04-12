import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import * as crypto from 'crypto-js';

@Injectable()
export class AppService {
    isMobile : boolean = false;
    arrayMp3 = [];
    prevPage: string = '';
    private windowWidth;    
    modalWasClosed: boolean = false;  
    chaveAcesso: any = '';
    baseUrlService: string = 'https://tvweb3.unip.br/api/';
    keyToEncrypt: string = 'V2Vqa2Ti9c';
    userIdEncrypted: any = localStorage.getItem('aks') || 'a';
	authAccess: string = '32D69BD2-9E51-4199-AD01-7C6758DC0C8C';
	userId: string = localStorage.getItem('uid'); // user id
    currentToken: string; // access key system
    username: string = ''; 
    loginInfo: any;
    usuario: any;
    headerDict;
    requestOptions;

    constructor(
		private router: Router,
        private http: Http,
        // private appComponent: AppComponent,
        private activatedRoute: ActivatedRoute
    ) {
        // Decrypt
        let bytes  = crypto.AES.decrypt(this.userIdEncrypted, 'V2Vqa2Ti9c');
        this.currentToken = bytes.toString(crypto.enc.Utf8); // access key system
        this.headerDict = {
            'Content-Type': 'application/json'
        }
            
        this.requestOptions = {
            headers: new Headers(this.headerDict), 
        }
    }

    verificaValidacoesForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((campo) => {
            var controle = formGroup.get(campo);
            controle.markAsTouched();
            if (controle instanceof FormGroup) {
                this.verificaValidacoesForm(controle);
            }
        });
    }
    
	
    
    isDesktop() {
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return this.windowWidth >= 768 ? true : false;
    }

    getFirstWord(word: string) {
        return word = word.replace(/ .*/,'');
    }

    eventIsRunnig() {
        let date = new Date(); 
        let currentDate = date.getDate() + "/"
                + (date.getMonth()+1)  + "/" 
                + date.getFullYear();
    
        let currentDay = date.getDate();
        let currentMonth = (date.getMonth() + 1);
        let currentYear = date.getFullYear();
        let currentHour = date.getHours();
    
        if(currentDay >= 2 && currentMonth == 9 && currentYear == 2018 && currentHour >= 15) {
          return true;
        }
          
        return false;
    }

    tratarObjeto(obj) {
        var newObj = '';
        let array = Object.getOwnPropertyNames(obj);
        $.each(array, (index, value) => { newObj += value + '=' + obj[value] + "&"})
        return newObj;
      }
    initMask(){
        setTimeout(() => {
            (<any>$('.rg')).mask('00.000.000-A', {reverse: false, negative: false});
            (<any>$('.telefone')).mask('00 00000 - 0000', {reverse: false, negative: false});
        }, 0);  
    }

}
