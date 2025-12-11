import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-heavy-chart',
    template: `
    <div class="chart-container glass-panel">
      <h3>📊 Heavy Chart Component</h3>
      <p>This component was lazy loaded!</p>
      <div class="bars">
        @for (bar of bars; track $index) {
          <div class="bar" [style.height.%]="bar" [style.background-color]="getColor($index)"></div>
        }
      </div>
    </div>
  `,
    styles: [`
    .chart-container {
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.4);
      text-align: center;
      animation: fadeIn 0.5s ease-out;
    }
    .bars {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 8px;
      height: 150px;
      margin-top: 1rem;
    }
    .bar {
      width: 20px;
      border-radius: 4px 4px 0 0;
      transition: height 0.5s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HeavyChartComponent implements OnInit {
    bars: number[] = [];

    ngOnInit() {
        // Simulate heavy initialization
        this.bars = Array.from({ length: 10 }, () => Math.floor(Math.random() * 80) + 20);
    }

    getColor(index: number): string {
        const colors = ['#f472b6', '#c084fc', '#818cf8', '#60a5fa', '#34d399'];
        return colors[index % colors.length];
    }
}
