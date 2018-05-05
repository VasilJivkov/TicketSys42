import { Component, Injectable, OnInit } from '@angular/core';
import { StatsService } from '../core/stats.service';
import { IStats } from '../models/stats';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ StatsService ],
})

@Injectable()
export class HomeComponent implements OnInit {
  private stats: IStats[];

  constructor(
      private statsService: StatsService ,
    ) { }

  public ngOnInit(): void {
    this.statsService.getAll().subscribe((data) => this.stats = data);
  }
}
