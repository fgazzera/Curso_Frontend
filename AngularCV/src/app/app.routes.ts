import { Routes } from '@angular/router';
import {Form} from './form/form'; 
import {Curriculum} from './curriculum/curriculum';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: Curriculum },
    { path: 'form', component: Form, canActivate: [authGuard] }
];
