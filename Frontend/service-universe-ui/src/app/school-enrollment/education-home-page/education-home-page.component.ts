import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-education-home-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './education-home-page.component.html',
  styleUrl: './education-home-page.component.scss'
})
export class EducationHomePageComponent {

}
