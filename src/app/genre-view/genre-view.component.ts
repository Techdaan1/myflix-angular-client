import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss'],
})
export class GenreViewComponent implements OnInit {
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
