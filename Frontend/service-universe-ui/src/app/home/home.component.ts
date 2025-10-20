import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;
  
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // Check if the user is already logged in (e.g., check local storage or a cookie)
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = storedLoginStatus === 'true';
  }

  public signIn(): void {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  public navigateTo(service: string): void {
    this.router.navigate([service]);
  }
}
