import { Component, OnInit } from "@angular/core";
import { DomainSearchDto, DomainDto } from "../model/model";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { debounceTime, filter, flatMap } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DataService } from '../_services/data-service.service';

@Component({
  selector: "app-domain-  search",
  templateUrl: "./domain-Search.component.html",
  styleUrls: ["./domain-Search.component.css"]
})

export class DomainSearch implements OnInit {
  dataSource: DomainSearchDto[] = [];
  domain: DomainSearchDto[] = [];
  filteredOptions$: Observable<DomainSearchDto[]>;
  selectedDomain$: Observable<DomainDto>;
  selectedDomain: DomainDto;
  myControl = new FormControl();

  constructor(private data: DataService) { }

  ngOnInit(): void {
    console.log("DomainSearch.ngOnInit");
    this.filteredOptions$ = this.myControl.valueChanges
    .pipe(
        debounceTime(400),
        filter(test => {
          const rst = test && test.toLowerCase().length > 1;
          return rst;
        }),
        flatMap(value => this.data.searchDomain(value)),
      );
      this.filteredOptions$.subscribe(result => this.dataSource = result);
  }
  
  valueChanged(event: MatAutocompleteSelectedEvent): void {
    // const unitId: number = +event.option.value;
    const machineName: string = event.option.value;
    const domain = this.dataSource.find(t => t.domName === machineName);
    if(domain) {
      this.selectedDomain$ = this.data.getDomain(domain.domNo);
      this.selectedDomain$.subscribe(selected => this.selectedDomain = selected);
      }
  }

}

