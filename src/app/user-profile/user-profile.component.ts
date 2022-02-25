import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  favMovies: any = {};

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  getUserProfile(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.favMovies = res.FavoriteMovies;
        console.log(this.favMovies);
        return this.favMovies;
      });
    }
  }

  removeFavMovies(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open('Movie has been removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favMovies;
    });
  }

  deleteUser(): void {
    this.fetchApiData.deleteUserProfile().subscribe(() => {
      this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

  openEditUserDialog(): void {
    this.dialog.open(UserEditComponent, {
      width: '280px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

  openDirectorDialog(name: string, bio: string, birthdate: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name: name, bio: bio, birth: birthdate },
      width: '300px',
    });
  }

  openMovieDescDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }
}
