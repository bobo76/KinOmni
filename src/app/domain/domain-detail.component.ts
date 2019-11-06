import { Component, OnInit, Input } from '@angular/core';
import { DomainDto } from '../model/model';

@Component({
  selector: 'app-domain-detail',
  templateUrl: './domain-detail.component.html',
  styleUrls: ['./domain-detail.component.scss']
})
export class DomainDetailComponent implements OnInit {
  @Input()
  selectedDomain: DomainDto;
  
  constructor() { }

  ngOnInit() {
  }

}
