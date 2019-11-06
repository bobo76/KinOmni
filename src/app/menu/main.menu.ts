import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'main-menu',
    templateUrl: 'main.menu.html',
    styleUrls: ['main.menu.css']
})

export class MainMenu {
    constructor(private router: Router){
    }

    public gotoDomain(dest: string){
        console.log('Goto ' + dest);
        this.router.navigate([dest]);
    }
}