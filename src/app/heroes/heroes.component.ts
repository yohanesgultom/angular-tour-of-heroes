import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
    title = 'Tour of Heroes';
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
      private heroService: HeroService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.getHeroes();
    }

    onSelect(hero: Hero): void {
      this.selectedHero = hero;
    }

    getHeroes(): void {
      this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    gotoDetail() {
      this.router.navigate(['/detail', this.selectedHero.id]);
    }
}
