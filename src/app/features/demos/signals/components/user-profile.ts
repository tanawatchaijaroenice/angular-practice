import { Component, input, resource } from '@angular/core';

@Component({
    selector: 'app-user-profile',
    template: `
    <div class="card glass-panel">
        <h3>User Profile (Resource)</h3>
        <p>Async data fetching based on Input ID.</p>
        
        <div class="controls">
            <span class="value">User ID: {{ userId() }}</span>
        </div>

        <div class="resource-display">
            @if (userResource.isLoading()) {
                <div class="loading-spinner">Loading...</div>
            } @else if (userResource.error()) {
                <div class="error-message">Error: {{ userResource.error() }}</div>
            } @else if (userResource.value(); as user) {
                <div class="user-details">
                    <div><strong>Name:</strong> {{ user.name }}</div>
                    <div><strong>Email:</strong> {{ user.email }}</div>
                    <div><strong>Role:</strong> {{ user.role }}</div>
                </div>
            }
        </div>
        
        <div class="code-snippet">
            <code>user = resource(&#123; loader: () => fetch(id()) &#125;);</code>
        </div>
    </div>
  `,
    styles: [`
    .card { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .controls { display: flex; justify-content: center; gap: 1rem; font-size: 1.2rem; font-weight: bold; }
    .resource-display { min-height: 120px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.2); border-radius: 8px; padding: 1rem; }
    .user-details { width: 100%; text-align: left; display: flex; flex-direction: column; gap: 0.5rem; }
    .loading-spinner { color: var(--secondary); font-style: italic; }
    .error-message { color: #fca5a5; background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; width: 100%; text-align: center; }
  `]
})
export class UserComponent {
    // Input signal with default
    userId = input(1);

    // Resource derived from input signal
    userResource = resource({
        loader: async () => {
            const id = this.userId(); // Track dependency

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (id < 1) throw new Error('Invalid User ID');

            return {
                id: id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
                role: id % 2 === 0 ? 'Admin' : 'Member'
            };
        },
    });
}
