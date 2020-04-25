import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { GameProvider } from '../../models/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-providers',
  templateUrl: './game-providers.component.html',
  styleUrls: [ './game-providers.component.css' ]
})
export class GameProvidersComponent implements OnInit {
  providers: GameProvider[] = [];
  selectedProvider: any = {};

  constructor(private gameService: GameService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  onOptionSelected(): void {
    const selectedProvider = this.selectedProvider;

    if(typeof selectedProvider === 'string') {
      this.router.navigate(['/games']);
      return;
    }

    this.router.navigate([`/games/provider/${selectedProvider.id}`]);
  }

  updateSelectedProvider(type, id) {
    if(type == 'provider') {
      this.selectedProvider = this.providers.find(provider => provider.id == id);
    }
    else {
      this.selectedProvider = 'All providers';
    }
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(params => {
      const type = this.activatedRoute.snapshot.paramMap.get('type');
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      if(!this.providers.length) {
        this.gameService.getDistinctProviders()
          .subscribe(providers => {
            this.providers = providers;
            this.updateSelectedProvider(type, id);
          });
      }
      else {
        this.updateSelectedProvider(type, id);
      }
    });
  }
}
