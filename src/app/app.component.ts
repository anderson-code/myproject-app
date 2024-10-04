import { Component, computed, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    CustomSidenavComponent
  ],
  template: `
   <mat-toolbar class="mat-elevation-z3" color="primary">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
          <mat-icon>menu</mat-icon>
      </button>
      <span><strong>TCC</strong> Manager</span>

      <span class="spacer"></span>

      <button mat-icon-button>
        <mat-icon matBadgeColor="accent" matBadge="9" matBadgeSize="small">email</mat-icon>
      </button>

      <button mat-icon-button>
        <mat-icon matBadgeColor="accent" matBadge="15" matBadgeSize="small">notifications</mat-icon>
      </button>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
      <app-custom-sidenav [collapsed]="collapsed()" />
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
          <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <mat-toolbar class="app-toolbar">
      <span>TCC Manager</span>
    </mat-toolbar>


  `,
  styles: [`
    mat-toobar {
      position: relative;
      z-index: 5;
    }

    .content {
      padding: 24px;
    }

    mat-sidenav-container {
      height: calc(100vh - 128px);
    }

    mat-sidenav,
    mat-sidenav-content {
      transition: all 500ms ease-in-out;
    }

    .spacer {
      flex: 1 1 auto;
    }

  `],
})
export class AppComponent {
  // @ViewChild(MatSidenav)
  // sidenav! : MatSidenav;

  constructor(private observer: BreakpointObserver) {}

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if(res.matches) {
        this.collapsed = signal(true);
        this.sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
      } else {
        this.collapsed = signal(false);
        this.sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
      }
    });
  }
}
