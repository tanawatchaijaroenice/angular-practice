import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Signals } from './features/demos/signals/signals';
import { ControlFlow } from './features/demos/control-flow/control-flow';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'demos/signals', component: Signals },
    { path: 'demos/control-flow', component: ControlFlow },
    { path: '**', redirectTo: '' }
];
