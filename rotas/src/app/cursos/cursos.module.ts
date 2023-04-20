import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CursosComponent } from "./cursos.component";
import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoNaoEncontradoComponent } from "./curso-nao-encontrado/curso-nao-encontrado.component";
import { CursosService } from "./cursos.service";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule, // No módulo de funcionalidade usamos CommonModule em vez de BrowserModule
        RouterModule
    ],
    exports: [],
    declarations: [
        CursosComponent,
        CursoDetalheComponent,
        CursoNaoEncontradoComponent
    ],
    providers: [CursosService]
})

export class CursosModule { }