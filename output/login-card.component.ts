```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="flex items-center justify-center min-h-screen p-4"
         style="font-family: Inter, sans-serif;">
      <mat-card class="
          w-full max-w-md p-8
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-[0_4px_30px_rgba(0,0,0,0.1)]
          relative z-10
          flex flex-col gap-6
          "
          style="border-radius: 8px;">

        <mat-card-title class="text-3xl font-bold mb-6 text-center"
                        style="color: #6366f1;">
          Login
        </mat-card-title>

        <form [formGroup]="loginForm" (ngSubmit)="login()" class="flex flex-col gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Email</mat-label>
            <input matInput formControlName="username" type="email" placeholder="Enter your email">
            <mat-icon matPrefix class="mr-2">email</mat-icon>
            @if (loginForm.get('username')?.invalid && (loginForm.get('username')?.dirty || loginForm.get('username')?.touched)) {
              <mat-error>
                @if (loginForm.get('username')?.errors?.['required']) {
                  Email is required.
                }
                @if (loginForm.get('username')?.errors?.['email']) {
                  Please enter a valid email.
                }
              </mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password" placeholder="Enter your password">
            <mat-icon matPrefix class="mr-2">lock</mat-icon>
            @if (loginForm.get('password')?.invalid && (loginForm.get('password')?.dirty || loginForm.get('password')?.touched)) {
              <mat-error>
                @if (loginForm.get('password')?.errors?.['required']) {
                  Password is required.
                }
                @if (loginForm.get('password')?.errors?.['minlength']) {
                  Password must be at least 6 characters long.
                }
              </mat-error>
            }
          </mat-form-field>

          <button mat-flat-button
                  type="submit"
                  [disabled]="loginForm.invalid"
                  class="w-full py-3 text-white font-semibold transition-all duration-200"
                  style="background-color: #6366f1; border-radius: 8px;">
            Login
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    /* Custom styles to ensure Angular Material components align with tokens */

    /* Primary color for mat-form-field focus/label */
    .mat-mdc-form-field.mat-focused .mat-mdc-form-field-ripple,
    .mat-mdc-form-field.mat-focused .mat-mdc-form-field-label {
      color: #6366f1 !important;
    }

    /* Primary color for mat-input caret */
    .mat-mdc-form-field .mat-mdc-form-field-input-control.mdc-text-field__input {
      caret-color: #6366f1 !important;
    }

    /* Primary color for mat-form-field outline when focused */
    .mat-mdc-form-field.mat-focused .mdc-notched-outline__leading,
    .mat-mdc-form-field.mat-focused .mdc-notched-outline__notch,
    .mat-mdc-form-field.mat-focused .mdc-notched-outline__trailing {
      border-color: #6366f1 !important;
    }

    /* Error text color (using a standard red as no specific error color token was provided) */
    .mat-mdc-form-field .mat-mdc-form-field-error {
      color: #ef4444 !important; /* Tailwind red-500 */
    }

    /* Button disabled state */
    .mat-mdc-button[disabled] {
      opacity: 0.7;
      cursor: not-allowed;
      background-color: #6366f1 !important; /* Keep primary color, but reduce opacity */
      color: rgba(255, 255, 255, 0.7) !important;
    }
  `]
})
export class LoginCardComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() {}

  login() {
    if (this.loginForm.valid) {
      console.log('Login attempt:', this.loginForm.value);
      // Implement actual login logic here
    } else {
      console.log('Form is invalid');
      // Optionally show error messages for invalid fields
    }
  }
}
```