import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  search(term: string) {
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }

  ngOnInit() {
    this.heroes = this.searchTerms
      .debounceTime(300) // wait 300ms after each keystroke
      .distinctUntilChanged() // ignore if next search term is the same
      .switchMap( // swtch to new observable each time the term changes
        // return the http search observable if term is not null
        // otherwise return empty array Observable
        term => term ? this.heroService.search(term) : Observable.of<Hero[]>([])
      )
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

}
