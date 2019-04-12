// AngularCli
import * as $ from 'jquery';
import 'jqueryui';
import * as bootstrap from 'bootstrap';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Modules
import { AppRoutingModule } from './app.routing.module';
// Components e Services
import { AppComponent } from './app.component';
import { AppPipe } from './app.pipe';
import { AppService } from './app.service';
import { Ng2BRPipesModule } from 'ng2-brpipes';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthService } from './cadastro/auth.service';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { AovivoComponent } from './aovivo/aovivo.component';
import { CadastroAoVivoComponent } from './cadastro-ao-vivo/cadastro-ao-vivo.component';
import { CadastroAoVivoService } from './cadastro-ao-vivo/cadastro-ao-vivo.service';
import { DuvidasComponent } from './duvidas/duvidas.component';
import { EdicoesComponent } from './edicoes/edicoes.component';
import { NavbarOldComponent } from './navbar-old/navbar-old.component';
import { MidiaComponent } from './midia/midia.component';
import { CadastroBandasComponent } from './cadastro-bandas/cadastro-bandas.component';
import { DjComponent } from './cadastro-bandas/dj/dj.component';
import { DuetsComponent } from './cadastro-bandas/duets/duets.component';
import { InterpreteComponent } from './cadastro-bandas/interprete/interprete.component';
import { CompIneditaComponent } from './cadastro-bandas/comp-inedita/comp-inedita.component';
import { CoverComponent } from './cadastro-bandas/cover/cover.component';
import { PlayerComponent } from './shared/player/player.component';
import { CadastroConcluidoComponent } from './shared/cadastro-concluido/cadastro-concluido.component';


@NgModule({
    declarations: [
        AppComponent,
        CadastroComponent,
        AppPipe,
        NavigationComponent,
        HomeComponent,
        InformacoesComponent,
        AovivoComponent,
        MidiaComponent,
        CadastroAoVivoComponent,
        DuvidasComponent,
        EdicoesComponent,
        NavbarOldComponent,
        CadastroBandasComponent,
        DjComponent,
        DuetsComponent,
        InterpreteComponent,
        CompIneditaComponent,
        CoverComponent,
        PlayerComponent,
        CadastroConcluidoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpModule,
        ToastModule.forRoot(),
        Ng2BRPipesModule,
        AppRoutingModule
    ],
    providers: [
        [
          AppService,
          AuthService,
          CadastroAoVivoService,
          Title
        ]
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
