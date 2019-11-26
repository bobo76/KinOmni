import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { menuItem } from '@app/model';

@Component({
    selector: 'main-menu',
    templateUrl: 'main.menu.html',
    styleUrls: ['main.menu.scss']
})

export class MainMenu {
    options: FormGroup;
    meniList: menuItem[] = [{ icon: 'account_box', route: 'user', title:'Users' },
        { icon: 'computer', route: 'unit', title: 'Unit' },
        { icon: 'location_city', route: 'domain', title: 'Domain' },
        { icon: 'lock_open', route: 'login', title: 'Login' }];

    constructor(fb: FormBuilder, private router: Router) {
        this.options = fb.group({
            bottom: 0,
            fixed: false,
            top: 0
        });
        
    }

    public gotoDomain(dest: string) {
        console.log('Goto ' + dest);
        this.router.navigate([dest]);
    }
}