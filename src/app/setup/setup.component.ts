import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    participantes: [null as number | null, [Validators.required, Validators.min(1), Validators.max(300)]],
    premios: [null as number | null, [Validators.required, Validators.min(1), Validators.max(300)]]
  });

  enviado = false;
  errorMsg: string | null = null;

  submit() {
    this.enviado = true;
    this.errorMsg = null;

    if (this.form.invalid) return;

    const participantes = this.form.value.participantes ?? 0;
    const premios = this.form.value.premios ?? 0;

    if (premios > participantes) {
      this.errorMsg = 'La cantidad de premios no puede ser mayor a la cantidad de participantes.';
      return;
    }

    this.router.navigate(['/sorteo', participantes, premios]);
  }
}
