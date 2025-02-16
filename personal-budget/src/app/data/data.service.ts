import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BudgetItem {
  budget: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private budgetData: BudgetItem[] = [];

  constructor(private http: HttpClient) { }

  fetchBudgetData(): Observable<BudgetItem[]> {
    if (this.budgetData.length > 0) {
      // If budgetData is already populated, return it as an observable
      return of(this.budgetData);
    } else {
      // Otherwise, make an HTTP call to fetch the data
      return this.http.get<BudgetItem[]>('http://localhost:3000/budget').pipe(
        map(response => {
          this.budgetData = response;
          return this.budgetData;
        })
      );
    }
  }

  getBudgetData(): BudgetItem[] {
    return this.budgetData;
  }
}