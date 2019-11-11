import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomainDto } from '../model/model';

@Component({
  selector: 'app-domain-detail',
  templateUrl: './domain-detail.component.html',
  styleUrls: ['./domain-detail.component.scss']
})
export class DomainDetailComponent implements OnInit {
  @Input()
  selectedDomain: DomainDto;
  @Output()
  saveEvent = new EventEmitter<DomainDto>();
  @Output()
  undoEvent = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
  }
  saveDomain(): void {
    this.saveEvent.emit(this.selectedDomain);
  }
  undoChanges(): void {
    this.undoEvent.emit();
  }
}
