import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Content</h1>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class ContentComponent {

}
