import { Routes } from '@angular/router';
import {Form} from './form/form'; 
import {Curriculum} from './curriculum/curriculum';

export const routes: Routes = [
    { path: '', component: Curriculum },
    { path: 'curriculum', component: Curriculum },
    { path: 'form', component: Form }
];
