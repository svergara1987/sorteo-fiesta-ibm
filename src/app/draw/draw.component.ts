import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-draw',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatListModule],
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
  winnersInOrder: number[] = [];

  prizeNames: { [key: number]: string } = {
    1: 'Look Style',
    2: 'Vuelo en Parapente o Paratrike',
    3: 'Relax',
    4: '1000 Blue Points',
    5: 'Bodega Cerro del Toro',
    6: 'Estadía Boutique 2p',
    7: 'Petit Gourmet',
    8: 'Bodega Pizorno',
    9: 'Relax',
    10: 'Bodega Cerro del Toro',
    11: 'TV - 50 pulgadas',
    12: 'Look Style',
    13: 'Vuelo en Parapente o Paratrike',
    14: 'Petit Gourmet',
    15: '1000 Blue Point',
    16: 'Look Style',
    17: 'Estadía Boutique 2p',
    18: 'Petit Gourmet',
    19: 'Relax',
    20: 'Bodega Pizorno',
    21: 'Bodega Cerro del Toro',
    22: 'TV - 50 pulgadas',
    23: 'Vuelo en Parapente o Paratrike',
    24: 'Estadía Boutique 2p',
    25: 'Petit Gourmet',
    26: 'Bodega Cerro del Toro',
    27: '1000 Blue Point',
    28: 'Vuelo en Parapente o Paratrike',
    29: 'Petit Gourmet',
    30: 'Bodega Cerro del Toro',
    31: 'Estadía Boutique 2p',
    32: '1000 Blue Point',
    33: 'Bodega Pizorno',
    34: 'TV - 50 pulgadas'
  };

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
      this.winnersInOrder.push(winner);
    }, this.intervalMs);
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
