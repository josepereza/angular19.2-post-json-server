import { Routes } from '@angular/router';
import { HomeComponent } from './posts/pages/home/home.component';
import { FormularioComponent } from './posts/pages/formulario/formulario.component';
import { ListadoComponent } from './posts/pages/listado/listado.component';
import { EditComponent } from './posts/pages/edit/edit.component';

export const routes: Routes = [
    {
        path:'home', component:HomeComponent
    },
    {
        path:'formulario', component:FormularioComponent
    },
    { path: 'posts', component: ListadoComponent},
    { path: 'new', component: FormularioComponent },
    { path: 'posts/:id', component: FormularioComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: '', redirectTo: '/posts', pathMatch: 'full' }

];
