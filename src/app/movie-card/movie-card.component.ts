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
<<<<<<< HEAD
  Favorites: any[] = [];
=======
  FavoriteMovies: any[] = [];
>>>>>>> parent of 87bf43a (Revert "Update")
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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreView(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        name,
        description,
      },
      width: '500px',
    });
  }

  openDirectorView(name: string, bio: string, birthdate: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birthdate },
      width: '500px',
    });
  }

  openMovieDescription(name: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
<<<<<<< HEAD
      this.Favorites = resp.FavoriteMovies;
      console.log(this.Favorites);
=======
      this.FavoriteMovies = resp.FavoriteMovies;
      console.log(this.FavoriteMovies);
>>>>>>> parent of 87bf43a (Revert "Update")
    });
  }

  addFavoriteMovies(id: string, title: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your Watchlist!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

<<<<<<< HEAD
  removeFavoriteMovie(id: string): void {
=======
  /**
   * use API endpoint to remove the favorite movie of the user
   * @function deleteFavoriteMovies
   * @param id {string}
   * @returns update users data in json format
   */
  removeFavoriteMovies(id: string): void {
>>>>>>> parent of 87bf43a (Revert "Update")
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${id} has been removed from your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

<<<<<<< HEAD
  isFavorite(id: string): boolean {
    return this.Favorites.some((movie) => movie._id === id);
  }
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id)
      : this.addFavoriteMovies(movie._id, movie.Title);
=======
  /**
   * check if the movie is a favorite of the user
   * @param id {string}
   * @returns true or false
   */
  isFavorite(id: string): boolean {
    return this.FavoriteMovies.some((movie) => movie._id === id);
  }
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovies(movie._id)
      : this.addFavoriteMovies(movie._id);
>>>>>>> parent of 87bf43a (Revert "Update")
  }
}
