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
  favorites: any[] = [];
  user: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
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
   *open a dialog to display the MovieDescriptionComponent
   * @param name {string}
   * @param description {string}
   */
  openMovieDescDialog(name: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  /**
   * get the user's favorite movies from the user's data
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
    });
  }

  /**
   * use API endpoint to add the favorite movie of the user
   * @function addFavoriteMovies
   * @param id {string}
   * @returns a list of movies in json format
   */

  addFavoriteMovies(id: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${id} has been added to your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * use API endpoint to remove the favorite movie of the user
   * @function deleteFavoriteMovies
   * @param id {string}
   * @returns update users data in json format
   */
  removeFavoriteMovie(id: string): void {
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
   * check if the movie is the user's favorite?
   * @param id {string}
   * @returns true or false
   */
  isFavorite(id: string): boolean {
    return this.favorites.some((movie) => movie._id === id);
  }
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id)
      : this.addFavoriteMovies(movie._id);
  }
}
