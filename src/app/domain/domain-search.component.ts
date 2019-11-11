import { Component, OnInit } from "@angular/core";
import { DomainSearchDto, DomainDto, DomainGroupDto } from "../model/model";
import { Observable } from "rxjs";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { debounceTime, filter, flatMap, tap, switchMap, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DataService } from '../_services/data-service.service';
import { AlertService } from '../_services/alert.service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-domain-  search",
  templateUrl: "./domain-Search.component.html",
  styleUrls: ["./domain-Search.component.css"]
})

export class DomainSearch implements OnInit {
  dataSource: DomainSearchDto[] = [];
  selectedDomain$: Observable<DomainDto>;
  selectedDomain: DomainDto;
  domainsForm: FormGroup;
  isLoading: boolean;

  constructor(private data: DataService,
    private fb: FormBuilder, 
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.domainsForm = this.fb.group({
      domainInput: null
    });
    this.domainsForm
      .get('domainInput')
      .valueChanges
      .pipe(
        debounceTime(400),
        filter(test => {
          return test && test.length > 1;
        }),
        tap(() => this.isLoading = true),
        switchMap(value => this.data.searchDomain(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(result => this.dataSource = result,
        error => {
          this.alertService.httpError(error);
        }
      );
  }

  displayFn(domain: DomainSearchDto) {
    if (domain) { 
      return domain.domName;
    }
  }

  valueChanged(event: MatAutocompleteSelectedEvent): void {
    const domain: DomainSearchDto = event.option.value;
    if(domain) {
      this.selectedDomain$ = this.data.getDomain(domain.domNo);
      this.selectedDomain$.subscribe(
        selected => this.selectedDomain = selected,
        error => {
          const erMsg = error as HttpErrorResponse;
          this.alertService.error(erMsg.error.message);
        }
      );
    }
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
    this.selectedDomain$.subscribe(selected => this.selectedDomain = selected);
  }

}