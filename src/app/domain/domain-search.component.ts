import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { DomainSearchDto, IDomainDto } from "../model/model";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { debounceTime, filter, tap, switchMap, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { DataService } from "../_services/data.service";
import { AlertService } from "../_services/alert.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-domain-search",
  templateUrl: "./domain-search.component.html",
  styleUrls: ["./domain-search.component.scss"]
})
export class DomainSearchComponent implements OnInit {
  @Output()
  domainSelectedEvent = new EventEmitter<IDomainDto>();
  @Input()
  selectedDomain: IDomainDto;

  dataSource: DomainSearchDto[] = [];
  selectedDomain$: Observable<IDomainDto>;
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
      .get("domainInput")
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

  displayFn(domain: DomainSearchDto): string {
    if (domain) {
      return domain.domName;
    }
  }

  valueChanged(event: MatAutocompleteSelectedEvent): void {
    const domain: DomainSearchDto = event.option.value;
    if (domain) {
      this.selectedDomain$ = this.data.getDomain(domain.domNo);
      this.selectedDomain$.subscribe(
        selected => {
          this.selectedDomain = selected;
          this.domainSelectedEvent.emit(selected);
        },
        error => {
          const erMsg: HttpErrorResponse = error as HttpErrorResponse;
          this.alertService.error(erMsg.error.message);
        }
      );
    }
  }
}