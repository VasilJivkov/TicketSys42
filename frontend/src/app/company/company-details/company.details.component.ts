import { Component, OnInit, Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyService } from '../../core/company.service';
import { CompanyInfo } from '../../models/companyInfo';
import { CompanyDetails } from '../../models/company.details';


@Component({
  selector: 'app-home',
  templateUrl: './company.details.component.html',
  styleUrls: ['./company.details.component.css'],
  providers: [ CompanyService ]
})

@Injectable()
export class CompanyDetailsComponent implements OnInit {

  constructor( private companyService: CompanyService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  companyInfo: CompanyInfo;

  ngOnInit(): void {
    const companyTitle = this.activatedRoute.snapshot.params.company;
    this.companyService.getByCompanyName(companyTitle).subscribe((res: CompanyDetails) => {
      this.companyInfo = res.companyInfo;
    });
  }

}
