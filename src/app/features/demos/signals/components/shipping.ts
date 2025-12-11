import { Component, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ShippingMethod = 'Standard' | 'Express' | 'Overnight';

@Component({
    selector: 'app-shipping',
    imports: [FormsModule],
    template: `
    <div class="card glass-panel">
        <h3>Shipping (Linked Signal)</h3>
        <p>Resets when dependency (Country) changes.</p>
        
        <div class="form-group">
            <label>Country (Input):</label>
            <div class="value highlight">{{ country() }}</div>
        </div>

        <div class="form-group">
            <label>Shipping Method:</label>
            <div class="radio-group">
                @for (opt of options; track opt) {
                    <label class="radio-label">
                        <input type="radio" 
                               [name]="'shipping'" 
                               [value]="opt"
                               [checked]="shippingMethod() === opt"
                               (change)="updateShipping(opt)">
                        {{ opt }}
                    </label>
                }
            </div>
        </div>
        
        <div class="code-snippet">
            <code>shipping = linkedSignal(() => country() === 'Canada' ? 'Express' : 'Standard');</code>
        </div>
    </div>
  `,
    styles: [`
    .card { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .highlight { color: var(--secondary); font-weight: 700; font-size: 1.2rem; }
    .radio-group { display: flex; gap: 1rem; flex-wrap: wrap; }
    .radio-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 20px; transition: all 0.2s; }
    .radio-label:hover { background: rgba(255, 255, 255, 0.1); }
  `]
})
export class ShippingComponent {
    // Required input signal
    country = input.required<string>();

    // Output signal
    shippingChange = output<string>();

    options: ShippingMethod[] = ['Standard', 'Express', 'Overnight'];

    // Linked signal: Resets when country changes
    shippingMethod = linkedSignal<ShippingMethod>(() => {
        const country = this.country();
        if (country === 'Canada') return 'Express';
        return 'Standard';
    });

    updateShipping(method: ShippingMethod) {
        this.shippingMethod.set(method);
        this.shippingChange.emit(method);
    }
}
