import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(x => x.CursosModule),
    canActivate: [AuthGuard]
  },
  { path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(x => x.AlunosModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
