import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h2>
        {{title}}!
      </h2>
    </div>
    <main-menu></main-menu>
    <alert></alert>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = "KinOmni Web";
}
