import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game }         from '../../models/game';
import { GameService }  from '../../services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: [ './game-detail.component.css' ]
})
export class GameDetailComponent implements OnInit {
  @Input() game: Game;
  appImgFallback = '/assets/united_remote.jpg';

  sortedItems = [];

  items = {
    id: {
      label: 'ID'
    },
    server_game_id: {
      label: 'Server Game ID'
    },
    extearnal_game_id: {
      label: 'External Game ID'
    },
    front_game_id: {
      label: 'Front Game ID'
    },
    title: {
      label: 'Title'
    },
    status: {
      label: 'Status'
    },
    provider: {
      label: 'Provider'
    },
    provider_title: {
      label: 'Provider Title'
    },
    cats: {
      label: 'Categories',
      list: true
    },
    feats: {
      label: 'Features',
      list: true
    },
    thms: {
      label: 'Themes',
      list: true
    }
  }

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location
  ) {
    this.sortedItems = Object.keys(this.items);
  }

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gameService.getGame(id)
      .subscribe(game => this.game = game);
  }

  goBack(): void {
    this.location.back();
  }
}
