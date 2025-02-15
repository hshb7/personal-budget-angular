import { Component, Input } from '@angular/core';

@Component({
  selector: 'pb-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {

  @Input() title = 'Title';
  @Input() content = 'Content';

}
