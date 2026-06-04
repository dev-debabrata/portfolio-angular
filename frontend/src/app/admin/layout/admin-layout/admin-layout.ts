import { Component } from '@angular/core';
import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';
import { AdminHeader } from '../../components/admin-header/admin-header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminSidebar, AdminHeader, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
