import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-draw',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule],
  templateUrl: 'draw.component.html',
  styleUrl: 'draw.component.css'
})
export class DrawComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  participantes = 0;
  premios = 0;
  numeros: number[] = [];
  winners = new Set<number>();

  private timer: any;
  private intervalMs = 600;

  get cols(): number {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    if (w < 480) return 5;
    if (w < 768) return 8;
    if (w < 1200) return 12;
    return 15;
  }

  ngOnInit(): void {
    const p = Number(this.route.snapshot.paramMap.get('participantes'));
    const r = Number(this.route.snapshot.paramMap.get('premios'));

    if (!Number.isFinite(p) || !Number.isFinite(r) || p < 1 || r < 1) {
      this.router.navigateByUrl('/');
      return;
    }

    this.participantes = Math.min(300, Math.floor(p));
    this.premios = Math.min(Math.floor(r), this.participantes);
    this.numeros = Array.from({ length: this.participantes }, (_, i) => i + 1);

    // Start the draw automatically
    this.startDraw();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private startDraw() {
    this.clearTimer();
    this.timer = setInterval(() => {
      if (this.winners.size >= this.premios) {
        this.clearTimer();
        return;
      }
      const remaining = this.numeros.filter(n => !this.winners.has(n));
      if (remaining.length === 0) {
        this.clearTimer();
        return;
      }
      const idx = Math.floor(Math.random() * remaining.length);
      const winner = remaining[idx];
      this.winners.add(winner);
    }, this.intervalMs);
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
