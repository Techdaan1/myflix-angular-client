import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
/**
 *
 * @param data
 */
export class DirectorViewComponent implements OnInit {
  constructor(
    @Inject(MatDialogRef)
    public fetchApiData: FetchApiDataService,
    public data: {
      name: string;
      bio: string;
      birthdate: Date;
    }
  ) {}

  ngOnInit(): void {}
}
