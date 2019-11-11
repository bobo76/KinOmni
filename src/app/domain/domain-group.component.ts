import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomainGroupDto } from '../model/model';

@Component({
  selector: 'app-domain-group',
  templateUrl: './domain-group.component.html',
  styleUrls: ['./domain-group.component.scss']
})
export class DomainGroupComponent implements OnInit {
  @Input()
  selectedDomainGroup: DomainGroupDto;
  @Output()
  saveEvent = new EventEmitter<DomainGroupDto>();
  @Output()
  undoEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  get ramqSyncDate(): Date {
    return this.selectedDomainGroup.ramqSyncDate;
  }
  set ramqSyncDate(value: Date) {
    this.selectedDomainGroup.ramqSyncDate = value;
  }
  saveDomainGroup(): void {
    this.saveEvent.emit(this.selectedDomainGroup);
  }
  undoChanges(): void {
    this.undoEvent.emit();
  }
}
