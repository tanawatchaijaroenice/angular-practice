import { Component, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from './components/counter';
import { ShippingComponent } from './components/shipping';
import { UserComponent } from './components/user-profile';

@Component({
  selector: 'app-signals',
  imports: [FormsModule, CounterComponent, ShippingComponent, UserComponent],
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals {
  // Top-level state
  parentCount = signal(0);
  selectedCountry = signal<'USA' | 'Canada' | 'UK'>('USA');
  currentUserId = signal(1);

  logs = signal<{ time: string; message: string }[]>([]);

  constructor() {
    // Effect to log changes from components
    effect(() => {
      this.addLog(`Parent Count updated to: ${this.parentCount()}`);
    });
  }

  // Event handler for output signal
  onShippingChange(method: string) {
    this.addLog(`Shipping changed to: ${method}`);
  }

  nextUser() {
    this.currentUserId.update(id => id + 1);
  }

  prevUser() {
    this.currentUserId.update(id => Math.max(1, id - 1));
  }

  private addLog(message: string) {
    const time = new Date().toLocaleTimeString();
    this.logs.update((logs) => [{ time, message }, ...logs]);
  }
}
