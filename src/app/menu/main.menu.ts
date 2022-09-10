import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "@app/model";

@Component({
    selector: "main-menu",
    templateUrl: "main.menu.html",
    styleUrls: ["main.menu.scss"]
})

export class MainMenu {
    selected: MenuItem;
    menuList: MenuItem[] = [
        { icon: "add_to_queue", route: "activation", title:"Activation" },
        { icon: "account_box", route: "user", title:"Users" },
        { icon: "computer", route: "unit", title: "Unit" },
        { icon: "location_city", route: "domain", title: "Domain" },
        { icon: "lock_open", route: "login", title: "Login" }];

    constructor(private router: Router) {
    }

    public selectedItem(dest: MenuItem): void {
        this.selected = dest;
    }
    public clickSelected(dest: MenuItem): void {
        this.selected = dest;
    }
}