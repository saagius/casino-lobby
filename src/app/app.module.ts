import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { GameDetailComponent }  from './components/game-detail/game-detail.component';
import { GamesComponent }      from './components/games/games.component';
import { GameSearchComponent }  from './components/game-search/game-search.component';
import { GameCategoriesComponent }  from './components/game-categories/game-categories.component';
import { GameProvidersComponent }  from './components/game-providers/game-providers.component';

import { MessagesComponent }    from './components/messages/messages.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const imports = [
  BrowserModule.withServerTransition({ appId: 'casino-lobby' }),
  FormsModule,
  AppRoutingModule,
  HttpClientModule,
  LazyLoadImageModule
];

export const declarations = [
  AppComponent,
  GamesComponent,
  GameDetailComponent,
  GameSearchComponent,
  GameCategoriesComponent,
  GameProvidersComponent,
  MessagesComponent
];

@NgModule({
  imports,
  declarations,
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
