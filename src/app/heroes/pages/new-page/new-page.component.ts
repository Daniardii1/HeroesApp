import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})

export class NewPageComponent implements OnInit{

  public publishers: typeof Publisher = Publisher;

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private heroesService: HeroesService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById(id))
      ).subscribe( hero => {
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.patchValue(hero);
        return;
      });
  }

  onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe( hero => this.showSnackbar(`${hero.superhero} updated`));

      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe( hero => {
        this.showSnackbar(`${hero.superhero} created`);
        this.router.navigateByUrl('/heroes/edit/' + hero.id);
      });
  }

  OnDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result),
        switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id)),
        filter( (wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(result => {
        this.router.navigateByUrl('/heroes');
      });
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2000
    });
  }
}
