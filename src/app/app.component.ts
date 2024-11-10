import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  resume: any = null;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.getJsonData().subscribe(
      (data) => {
        this.resume = data;
        document.title = data.general.name;
      },
      (error) => {
        console.error('Error loading data! %s', error);
      }
    );
  }

  getJsonData(): Observable<any> {
    const apiUrl = 'resume.json';
    return this.http.get<any>(apiUrl);
  }
}
