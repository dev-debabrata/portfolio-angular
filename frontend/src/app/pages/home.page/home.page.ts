import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { SliderView } from '../../components/slider-view/slider-view';
import { Skills } from '../../components/skills/skills';
import { Experience } from '../../components/experience/experience';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-home.page',
  standalone: true,
  imports: [Hero, About, SliderView, Skills, Experience, Contact],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {}
