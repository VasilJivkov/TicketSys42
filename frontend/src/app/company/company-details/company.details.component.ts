import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../core/company.service';
import { ICompanyDetails } from '../../models/company.details';
import { ICompanyInfo } from '../../models/companyInfo';

@Component({
  selector: 'app-home',
  templateUrl: './company.details.component.html',
  styleUrls: ['./company.details.component.css'],
  providers: [ CompanyService ],
})

@Injectable()
export class CompanyDetailsComponent implements OnInit {
  public companyInfo: ICompanyInfo;

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {}

  public ngOnInit(): void {
    const companyTitle = this.activatedRoute.snapshot.params.company;
    this.companyService.getByCompanyName(companyTitle).subscribe((res: ICompanyDetails) => {
      this.companyInfo = res.companyInfo;
    });
  }

}
