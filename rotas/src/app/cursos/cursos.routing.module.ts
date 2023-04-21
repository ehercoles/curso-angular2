import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

const cursosRoutes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
  { path: ':id', component: CursoDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)], // No módulo de funcionalidade usamos forChild em vez de forRoot
  exports: [RouterModule]
})

export class CursosRoutingModule { }
