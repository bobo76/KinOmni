import { Component, OnInit } from "@angular/core";
import { DomainDto, DomainGroupDto } from "../model/model";
import { Observable } from "rxjs";
import { DataService } from '../_services/data-service.service';
import { AlertService } from '../_services/alert.service.service';

@Component({
  selector: "app-domain",
  templateUrl: "./domain.component.html",
  styleUrls: ["./domain.component.css"]
})

export class DomainComponent implements OnInit {
  selectedDomain$: Observable<DomainDto>;
  selectedDomain: DomainDto;

  constructor(private data: DataService,
    private alertService: AlertService)
    { }

  ngOnInit(): void {

  }

  onSaveDomainClick(domain: DomainDto): void {
    this.data.saveDomain(domain)
      .subscribe(result => {
        console.log("Save result : " + result);
      },
      error => {
        this.alertService.httpError(error);
      });
  }
  onSaveDomainGroupClick(domainGroup: DomainGroupDto): void {
    this.data.saveDomainGroup(domainGroup)
      .subscribe(result => {
        console.log("Save result : " + result);
      },
      error => {
        this.alertService.httpError(error);
      });
  }
  onUndoDomain(): void {
    this.selectedDomain$ = this.data.getDomain(this.selectedDomain.domNo);
    this.selectedDomain$.subscribe(selected => this.selectedDomain = selected,
      error => {
        this.alertService.httpError(error);
      });
  }
  onDomainSelectedEvent(domain: DomainDto): void {
    this.selectedDomain = domain;
  }
}