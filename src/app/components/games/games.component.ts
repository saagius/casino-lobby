import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../../models/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[];
  type: string = null;
  id: string = null;

  selectedCategoryId: string = null;
  selectedProviderId: string = null;

  constructor(private gameService: GameService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(_ => {
      this.getGames();
    });
  }

  getGames(): void {
    let method;

    const type = this.route.snapshot.paramMap.get('type');
    const id = this.route.snapshot.paramMap.get('id');

    if(type && id) {
      method = this.gameService.getGamesByTypeAndId(type, id);
    }
    else {
      method = this.gameService.getGames();
    }

    method
      .subscribe(games => {
        this.games = games
      });
  }
}
