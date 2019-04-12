// AngularCli
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { AovivoComponent } from './aovivo/aovivo.component';
import { CadastroAoVivoComponent } from './cadastro-ao-vivo/cadastro-ao-vivo.component';
import { DuvidasComponent } from './duvidas/duvidas.component';
import { EdicoesComponent } from './edicoes/edicoes.component';
import { MidiaComponent } from './midia/midia.component';
import { CadastroBandasComponent } from './cadastro-bandas/cadastro-bandas.component';
import { DjComponent } from './cadastro-bandas/dj/dj.component';
import { CompIneditaComponent } from './cadastro-bandas/comp-inedita/comp-inedita.component';
import { CoverComponent } from './cadastro-bandas/cover/cover.component';
import { DuetsComponent } from './cadastro-bandas/duets/duets.component';
import { InterpreteComponent } from './cadastro-bandas/interprete/interprete.component';
import { CadastroConcluidoComponent } from './shared/cadastro-concluido/cadastro-concluido.component';

const appRoutes: Routes = [
    
    // { path: 'cadastropremio', component: CadastroComponent, data: {title: 'Cadastro'}},
    // { path: 'cadastroaovivo', component: CadastroAoVivoComponent, data: {title: 'Ao vivo'}},
    // { path: 'aovivo', component: AovivoComponent, data: {title: 'Ao vivo'}},
    // { path: 'duvidas', component: DuvidasComponent, data: {title: 'Dúvidas'}},
    { path: 'cadastro-de-bandas/cadastro-concluido', component: CadastroConcluidoComponent, data: {title: 'Cadastro concluido'}},
    { path: 'cadastro-de-bandas', component: CadastroBandasComponent, data: {title: 'Cadastro de banda'}},
    { path: 'cadastro-de-bandas/dj', component: DjComponent, data: {title: 'Cadastro de banda'}},
    { path: 'cadastro-de-bandas/composicao-inedita', component: CompIneditaComponent, data: {title: 'Cadastro de banda'}},
    { path: 'cadastro-de-bandas/cover', component: CoverComponent, data: {title: 'Cadastro de banda'}},
    { path: 'cadastro-de-bandas/duets', component: DuetsComponent, data: {title: 'Cadastro de banda'}},
    { path: 'cadastro-de-bandas/interprete', component: InterpreteComponent, data: {title: 'Cadastro de banda'}},
    { path: 'midias', component: MidiaComponent, data: {title: 'Mídias'}},
    { path: 'edicoes', component: EdicoesComponent, data: {title: 'Dúvidas'}},
    { path: '', component: InformacoesComponent, pathMatch: 'full'},
    // { path: '', component: HomeComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
