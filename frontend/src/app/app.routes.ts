import { Routes } from '@angular/router';

import { HomePage } from './pages/home.page/home.page';

import { ProjectsListPage } from './pages/projects/projects-list.page/projects-list.page';
import { BlogListPage } from './pages/blogs/blog-list.page/blog-list.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },

  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsListPage,
      },

      {
        path: ':id',
        loadComponent: () =>
          import('./pages/projects/project-details.page/project-details.page').then(
            (m) => m.ProjectDetailsPage,
          ),
      },
    ],
  },

  {
    path: 'blogs',
    children: [
      {
        path: '',
        component: BlogListPage,
      },

      {
        path: ':id',
        loadComponent: () =>
          import('./pages/blogs/blog-details.page/blog-details.page').then(
            (m) => m.BlogDetailsPage,
          ),
      },
    ],
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
];
