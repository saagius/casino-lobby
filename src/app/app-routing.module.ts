import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesComponent }      from './components/games/games.component';
import { GameDetailComponent }  from './components/game-detail/game-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent },
  { path: 'games/:type/:id', component: GamesComponent },
  { path: 'game/:id', component: GameDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
