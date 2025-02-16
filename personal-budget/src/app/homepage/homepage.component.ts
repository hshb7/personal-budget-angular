import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { ArticleComponent } from '../article/article.component';

interface BudgetItem {
  budget: number;
  title: string;
}

interface BudgetResponse {
  data: {
    myBudget: BudgetItem[];
  };
}

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports:[ArticleComponent], // Add HttpClientModule to the imports array
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
        ]
      }
    ],
    labels: [] as string[]
  };

  private chart: Chart | undefined;

  constructor(private http: HttpClient) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
       
      }
      this.createChart();
  
      console.log(res);
    });
  }

  createChart(): void {
    const chartElement = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (chartElement) {
      const ctx = chartElement.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      }
    }
  }
}