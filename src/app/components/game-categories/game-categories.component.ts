import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { GameCategory } from '../../models/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-categories',
  templateUrl: './game-categories.component.html',
  styleUrls: [ './game-categories.component.css' ]
})
export class GameCategoriesComponent implements OnInit {
  categories: GameCategory[] = [];
  selectedCategory: any = {};

  constructor(private gameService: GameService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  onOptionSelected(): void {
    const selectedCategory = this.selectedCategory;

    if(typeof selectedCategory === 'string') {
      this.router.navigate(['/games']);
      return;
    }

    this.router.navigate([`/games/category/${selectedCategory.id}`]);
  }

  updateSelectedCategory(type, id) {
    if(type == 'category') {
      this.selectedCategory = this.categories.find(cat => cat.id == id);
    }
    else {
      this.selectedCategory = 'All categories';
    }
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(params => {
      const type = this.activatedRoute.snapshot.paramMap.get('type');
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      if(!this.categories.length) {
        this.gameService.getDistinctCategories()
          .subscribe(categories => {
            this.categories = categories;
            this.updateSelectedCategory(type, id);
          });
      }
      else {
        this.updateSelectedCategory(type, id);
      }
    });
  }
}
