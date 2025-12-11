import { Component, model, computed } from '@angular/core';

@Component({
    selector: 'app-counter',
    template: `
    <div class="card glass-panel">
        <h3>Counter (Model Signal)</h3>
        <div class="counter-display">
            <span class="value">{{ count() }}</span>
        </div>
        <div class="controls">
            <button (click)="decrement()" class="btn btn-secondary">-</button>
            <button (click)="increment()" class="btn">+</button>
            <button (click)="reset()" class="btn btn-danger">Reset</button>
        </div>
        <div class="computed-display">
            <span>Double: </span>
            <span class="value highlight">{{ doubleCount() }}</span>
        </div>
        <div class="code-snippet">
            <code>count = model(0);</code>
        </div>
    </div>
  `,
    styles: [`
    .card { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .counter-display { font-size: 4rem; font-weight: 700; text-align: center; color: var(--primary); text-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
    .controls { display: flex; justify-content: center; gap: 1rem; }
    .computed-display { text-align: center; margin-top: 1rem; font-size: 1.2rem; }
    .highlight { color: var(--secondary); font-weight: 700; }
    .btn-danger { background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
    .btn-danger:hover { background: rgba(239, 68, 68, 0.3); }
  `]
})
export class CounterComponent {
    // Model signal: Two-way binding
    // Parent can bind via [(count)]="parentCount"
    count = model(0);

    doubleCount = computed(() => this.count() * 2);

    increment() {
        this.count.update(v => v + 1);
    }

    decrement() {
        this.count.update(v => v - 1);
    }

    reset() {
        this.count.set(0);
    }
}
