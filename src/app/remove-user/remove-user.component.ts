import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss'],
})
export class RemoveUserComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackbar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  removeUser(): void {
    this.fetchApiData.deleteUserProfile().subscribe(() => {
      this.snackbar.open(`${this.user} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }
}
