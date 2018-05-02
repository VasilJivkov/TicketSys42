import { Component, OnInit, Injectable } from '@angular/core';
import { Stats } from '../models/stats';
import {StatsService} from "../core/stats.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ StatsService]
})

@Injectable()
export class HomeComponent implements OnInit {
    private stats: Stats[];

    constructor(
      private statsService: StatsService ,
    ) { }

  ngOnInit() {
    this.statsService.getAll().subscribe(data => this.stats = data);
  }
}
