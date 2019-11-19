import { Component, OnInit } from '@angular/core';
import { UserSearchDto } from '@app/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService, AlertService } from '@app/_services';
import { debounceTime, filter, tap, switchMap, finalize } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource: UserSearchDto[] = [];
  selectedUnit$: Observable<UserSearchDto>;
  selectedUnit: UserSearchDto;
  userForm: FormGroup;
  isLoading: boolean;

  constructor(private data: DataService,
    private fb: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userInput: null
    });

    this.userForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(400),
        filter(test => {
          return test && test.length > 1;
        }),
        tap(() => this.isLoading = true),
        switchMap(value => this.data.searchUser(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(result => this.dataSource = result,
        error => {
          this.alertService.httpError(error);
        });
  }
  displayFn(user: UserSearchDto) {
    if (user) {
      return user.firstName + ' ' + user.lastName;
    }
  }
  valueChanged(event: MatAutocompleteSelectedEvent): void {
    const unitSelected: UserSearchDto = event.option.value;
    if (unitSelected) {

    }
  }
}
