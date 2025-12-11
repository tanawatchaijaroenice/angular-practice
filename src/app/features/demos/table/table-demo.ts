import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

type SortDirection = 'asc' | 'desc' | '';
interface SortConfig {
    column: keyof Product | '';
    direction: SortDirection;
}

@Component({
    selector: 'app-table-demo',
    imports: [FormsModule, CommonModule],
    templateUrl: './table-demo.html',
    styleUrl: './table-demo.css',
})
export class TableDemo {
    // State
    products = signal<Product[]>(this.generateProducts(1000)); // Large dataset
    filterQuery = signal('');
    sortConfig = signal<SortConfig>({ column: '', direction: '' });
    currentPage = signal(1);
    pageSize = signal(10);

    // Computed: Filtered Data
    filteredProducts = computed(() => {
        const query = this.filterQuery().toLowerCase();
        return this.products().filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    });

    // Computed: Sorted Data
    sortedProducts = computed(() => {
        const data = [...this.filteredProducts()];
        const sort = this.sortConfig();

        if (!sort.column || !sort.direction) return data;

        return data.sort((a, b) => {
            const aValue = a[sort.column as keyof Product];
            const bValue = b[sort.column as keyof Product];

            if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    });

    // Computed: Paginated Data
    paginatedProducts = computed(() => {
        const startIndex = (this.currentPage() - 1) * this.pageSize();
        return this.sortedProducts().slice(startIndex, startIndex + this.pageSize());
    });

    // Computed: Total Pages
    totalPages = computed(() => Math.ceil(this.sortedProducts().length / this.pageSize()));

    // Actions
    sort(column: keyof Product) {
        const current = this.sortConfig();
        if (current.column === column) {
            // Cycle: asc -> desc -> reset
            if (current.direction === 'asc') this.sortConfig.set({ column, direction: 'desc' });
            else if (current.direction === 'desc') this.sortConfig.set({ column: '', direction: '' });
        } else {
            this.sortConfig.set({ column, direction: 'asc' });
        }
    }

    setPage(page: number) {
        this.currentPage.set(page);
    }

    nextPage() {
        this.currentPage.update(p => Math.min(p + 1, this.totalPages()));
    }

    prevPage() {
        this.currentPage.update(p => Math.max(p - 1, 1));
    }

    // Helper: Generate Dummy Data
    private generateProducts(count: number): Product[] {
        const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];
        const statuses: ('In Stock' | 'Low Stock' | 'Out of Stock')[] = ['In Stock', 'Low Stock', 'Out of Stock'];

        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: `Product ${i + 1}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            price: Math.floor(Math.random() * 500) + 10,
            stock: Math.floor(Math.random() * 100),
            status: statuses[Math.floor(Math.random() * statuses.length)]
        }));
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'In Stock': return 'status-success';
            case 'Low Stock': return 'status-warning';
            case 'Out of Stock': return 'status-danger';
            default: return '';
        }
    }
}
