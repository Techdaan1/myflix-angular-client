import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss'],
})
export class MovieDescriptionComponent implements OnInit {
  /**
   *
   * @param data
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MatDialog)
    public data: {
      name: string;
      description: string;
    }
  ) {}

  ngOnInit(): void {}
}
