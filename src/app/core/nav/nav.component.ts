import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';
import { RouterModule } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'czv-nav',
  imports: [
    MatIconButton,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
   authService:AuthService=inject(AuthService);

}
