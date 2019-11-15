import { Component, OnInit } from '@angular/core';
import { ActivationDto, unitTableDto, DomainDto } from '@app/model';
import { Observable } from 'rxjs';
import { DataService, AlertService } from '@app/_services';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class Activation implements OnInit {
  activation: ActivationDto;
  selectedDomain: DomainDto;
  selectedDomainList: DomainDto[] = [];

  waveList$: Observable<unitTableDto[]>;
  isLoading: boolean;
  
  quantityFormControl = new FormControl('', [
    Validators.required,
  ]);
  grpupFormControl = new FormControl('', [
    Validators.required,
  ]);


  matcher = new MyErrorStateMatcher();
  constructor(private data: DataService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.activation = new ActivationDto();
    this.isLoading = true;
    this.waveList$ = this.data.getWaveList();
    this.waveList$.subscribe(_ => this.isLoading = false,
      error => {
        this.alertService.httpError(error);
      }
    );
  }
  doActivation(): void {

  }
  clearScreen(): void {
    this.activation = new ActivationDto();
    this.selectedDomainList = [];
    this.quantityFormControl.reset();
    this.grpupFormControl.reset();
  }

  onDomainSelectedEvent(domain: DomainDto): void{
    this.selectedDomain = domain;
  }

  onAddDomain(): void{
    if (!this.selectedDomain){
      return;
    }
    const domain = this.selectedDomainList.find(item => item.domNo === this.selectedDomain.domNo);
    // const index: number = this.selectedDomainList.indexOf(this.selectedDomain);
    if (!domain){
      this.selectedDomainList.push(this.selectedDomain);
    }
  }
  removeDomain(i: number): void {
    this.selectedDomainList.splice(i, 1);
  }
  canGenerateCode(): boolean {
    if (!this.activation || !this.activation.group)
      return true;
    return !(this.activation.quantity > 0 && this.activation.group.length > 3 && 
      this.activation.vagueId && this.selectedDomainList.length > 0);
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}