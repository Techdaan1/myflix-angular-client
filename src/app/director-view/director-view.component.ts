import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
export class DirectorViewComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MatDialog)
    public data: {
      name: string;
      bio: string;
      birthdate: Date;
    }
  ) {}

  ngOnInit(): void {}
}
