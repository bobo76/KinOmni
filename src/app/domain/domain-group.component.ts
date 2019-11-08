import { Component, OnInit, Input } from '@angular/core';
import { DomainDto } from '../model/model';

@Component({
  selector: 'app-domain-group',
  templateUrl: './domain-group.component.html',
  styleUrls: ['./domain-group.component.scss']
})
export class DomainGroupComponent implements OnInit {
  @Input()
  selectedDomain: DomainDto;
  
  constructor() { }

  ngOnInit() {
  }

}
