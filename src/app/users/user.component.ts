import { Component, OnInit } from '@angular/core';
import { UserSearchDto, UserDto } from '@app/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { DataService, AlertService } from '@app/_services';
import { debounceTime, filter, tap, switchMap, finalize, catchError } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource: UserSearchDto[] = [];
  selectedUser$: Observable<UserDto>;
  selectedUser: UserDto;
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
        tap(() => {
          this.isLoading = true;
          console.log("Search user begin");
        }),
        switchMap(value => this.data.searchUser(value)
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      ).subscribe(result => this.dataSource = result,
        error => {
          console.log("Search user error");
          this.dataSource = undefined;
          this.alertService.httpError(error);
        },
        () => {
          console.log("Search user complete");
        });
  }
  
  displayFn(user: UserSearchDto) {
    if (user) {
      return user.firstName + ' ' + user.lastName;
    }
  }
  valueChanged(event: MatAutocompleteSelectedEvent): void {
    const userSelected: UserSearchDto = event.option.value;
    if (userSelected) {
      this.selectedUser$ = this.data.getUser(userSelected.useNo, userSelected.domNo);
      this.selectedUser$.subscribe(selected => this.selectedUser = selected,
        error => {
          this.alertService.httpError(error);
        });
    }
  }
}
