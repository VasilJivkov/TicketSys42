import { Component, OnInit, Injectable, EventEmitter } from '@angular/core';
import {CompanyService} from "../core/company.service";
import {CompanyDetails} from "../models/company.details";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyInfo} from "../models/companyInfo";


@Component({
  selector: 'app-home',
  templateUrl: './company.details.component.html',
  styleUrls: ['./company.details.component.css'],
  providers: [ CompanyService]
})

@Injectable()
export class CompanyDetailsComponent implements OnInit {
  // private companyDetails: CompanyInfo;
  //
  // constructor(
  //   private companyService: CompanyService,
  //   private activatedRoute: ActivatedRoute,
  // ) {
  //   this.activatedRoute.params.subscribe(params => console.log(params));
  //   // this.activatedRoute.params.subscribe( params => this.companyService(params['id']);
  // }

  constructor( private companyService: CompanyService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  companyInfo: CompanyInfo;
  companies: CompanyInfo[];

  id: number;


  ngOnInit(): void {
    this.companyService.getAll().subscribe(data => this.companies = data);

    this.activatedRoute.params
      .subscribe(x => {

        this.id = x['id'];
        this.companyService.getById(this.id).subscribe(data => this.companyInfo = data);

      });

    console.log(this.companyInfo.id);
  }

  nav() {
    this.router.navigate(['companies']);
  }

}
