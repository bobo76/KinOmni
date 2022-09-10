import { Component } from "@angular/core";
import { IDomainDto, IDomainGroupDto } from "../model/model";
import { Observable } from "rxjs";
import { DataService } from "../_services/data.service";
import { AlertService } from "../_services/alert.service";

@Component({
  selector: "app-domain",
  templateUrl: "./domain.component.html",
  styleUrls: ["./domain.component.css"]
})

export class DomainComponent {
  selectedDomain$: Observable<IDomainDto>;
  selectedDomain: IDomainDto;

  constructor(private data: DataService,
    private alertService: AlertService)
    { }

  onSaveDomainClick(domain: IDomainDto): void {
    this.data.saveDomain(domain)
      .subscribe(result => {
        console.log("Save result : " + result);
      },
      error => {
        this.alertService.httpError(error);
      });
  }
  onSaveDomainGroupClick(domainGroup: IDomainGroupDto): void {
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
  onDomainSelectedEvent(domain: IDomainDto): void {
    this.selectedDomain = domain;
  }
}