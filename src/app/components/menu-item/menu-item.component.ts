import { Component, input, signal } from '@angular/core';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px'}),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px'}))
      ])
    ])
  ],
  imports: [ MatListModule, RouterModule, MatIcon ],
  template: `
   <a
      mat-list-item
      class="menu-item"
      [routerLink]="item().route"
      (click)="toggleNested()"
      routerLinkActive="selected-menu-item"
      #rla="routerLinkActive"
      [activated]="rla.isActive"
      >
      <mat-icon
        [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
        matListItemIcon
        >{{ item().icon }}</mat-icon>
      @if (!collapsed()) {
        <span matListItemTitle>{{ item().label }}</span>
      }

      @if (item().subItems) {
        <span matListItemMeta>
          @if(nestedMenuOpen()) {
            <mat-icon>expand_less</mat-icon>
          } @else {
            <mat-icon>expand_more</mat-icon>
          }
        </span>
      }
  </a>

  @if (item().subItems && nestedMenuOpen()) {
        <div @expandContractMenu>
          @for (subItem of item().subItems; track subItem.label) {
            <a
              mat-list-item
              class="menu-item"
              [class.indented]="!collapsed()"
              [routerLink]="item().route + '/' + subItem.route"
              routerLinkActive
              #rla="routerLinkActive"
              [activated]="rla.isActive"
              >
              <mat-icon
                [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
                matListItemIcon
                >{{ subItem.icon }}</mat-icon>

                @if (!collapsed()) {
                  <span matListItemTitle>{{ subItem.label }}</span>
                }
            </a>
          }
        </div>
      }

  `,
  styles: `
    :host * {
      transition: all 500ms ease-in-out;
    }

    .menu-item {
      border-left: 5px solid;
      border-left-color: rgba(0, 0, 0, 0);
    }

    .selected-menu-item {
      background: rgba(0, 0, 0, 0.05);
      border-left-color: blue;
    }

    .indented {
      --mat-list-list-item-leading-icon-start-space: 48px;
    }
  `
})
export class MenuItemComponent {

  item = input.required<MenuItem>();

  collapsed = input(false);

  nestedMenuOpen = signal(false);

  toggleNested() {
    if(!this.item().subItems) {
      return;
    }
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
