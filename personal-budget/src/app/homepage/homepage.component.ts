import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';


@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
