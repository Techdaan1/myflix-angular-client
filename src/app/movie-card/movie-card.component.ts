/**
 * The Moviecard component renders the movies collection retreived from the myFlix database.
 * @module MovieCardComponent
 */
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  Favorites: any[] = [];
  user: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * use Api call to get data of all movies
   * @function getAllMovies
   * @return movies in json format
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   *open a dialog to display the GenreViewComponent
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        name,
        description,
      },
      width: '500px',
    });
  }

  /**
   *open a dialog to display the DirectorViewComponent
   * @param name {string}
   * @param bio {string}
   * @param birthdate {date}
   */
  openDirectorDialog(name: string, bio: string, birthdate: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birthdate },
      width: '500px',
    });
  }

  /**
   * open a dialog to display the MovieDescriptionComponent
   * @param title {string}
   * @param description {string}
   */
  openMovieDescDialog(name: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  /**
   * get the favorite movieslist of the user
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.Favorites = resp.FavoriteMovies;
      console.log(this.Favorites);
    });
  }

  /**
   * use API endpoint to let user add favorite movie
   * @function addFavoriteMovies
   * @param id {string}
   * @returns an array of the movie object in json format
   */
  addFavoriteMovies(id: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe(() => {
      this.snackBar.open(`${id} has been added to your Watchlist!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * use API end-point to remove user favorite
   * @function deleteFavoriteMovies
   * @param Id {string}
   * @returns favorite movies has been updated in json format
   */
  removeFavoriteMovies(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${id} has been removed from your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * is movie already in favoritelist of user
   * @param id {string}
   * @returns true or false
   */
  isFavorite(id: string): boolean {
    return this.Favorites.some((movie) => movie._id === id);
  }

  /**
   * add or remove favorite movie
   * if the movie is not on the favorite list, call
   * @function addFavoriteMovies
   * if the movie is already on the user favorite list, call
   * @function removeFavoriteMovies
   * @param movie {any}
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovies(movie._id)
      : this.addFavoriteMovies(movie._id);
  }
}
