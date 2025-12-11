import { Component, signal } from '@angular/core';
import { HeavyChartComponent } from './components/heavy-chart';

interface User {
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-control-flow',
  imports: [HeavyChartComponent],
  templateUrl: './control-flow.html',
  styleUrl: './control-flow.css',
})
export class ControlFlow {
  isVisible = signal(true);
  showDeferWhen = signal(false);
  role = signal<'admin' | 'user' | 'guest'>('admin');
  users = signal<User[]>([
    { id: 1, name: 'Alice', color: '#ec4899' },
    { id: 2, name: 'Bob', color: '#8b5cf6' },
    { id: 3, name: 'Charlie', color: '#06b6d4' },
  ]);

  toggleVisibility() {
    this.isVisible.update((v) => !v);
  }

  setRole(role: 'admin' | 'user' | 'guest') {
    this.role.set(role);
  }

  addUser() {
    const id = Math.max(0, ...this.users().map((u) => u.id)) + 1;
    const names = ['David', 'Eve', 'Frank', 'Grace', 'Heidi'];
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    this.users.update((users) => [
      ...users,
      { id, name: randomName, color: randomColor },
    ]);
  }

  removeUser(id: number) {
    this.users.update((users) => users.filter((u) => u.id !== id));
  }

  shuffle() {
    this.users.update((users) => [...users].sort(() => Math.random() - 0.5));
  }
}
