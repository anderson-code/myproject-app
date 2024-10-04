import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContentComponent } from './pages/content/content.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { PostsComponent } from './pages/posts/posts.component';
import { VideosComponent } from './pages/content/videos/videos.component';
import { PlaylistComponent } from './pages/content/playlist/playlist.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      {
        path: 'videos',
        component: VideosComponent
      },
      {
        path: 'playlist',
        component: PlaylistComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      }
    ]
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  {
    path: 'comment',
    component: CommentsComponent
  }

];
