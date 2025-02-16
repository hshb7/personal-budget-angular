import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ArticleComponent } from '../article/article.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { DataService, BudgetItem } from '../data/data.service'; // Ensure BudgetItem is imported

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

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

  constructor(private dataService: DataService) { 
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataService.fetchBudgetData().subscribe((budgetData: BudgetItem[]) => {
      this.dataSource.datasets[0].data = budgetData.map(item => item.budget);
      this.dataSource.labels = budgetData.map(item => item.title);
      this.createChart();
    });
  }

  ngOnDestroy(): void {
    // Destroy the chart when the component is destroyed
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart(): void {
    const chartElement = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (chartElement) {
      const ctx = chartElement.getContext('2d');
      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      }
    }
  }
}