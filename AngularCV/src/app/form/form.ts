import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

interface ContactReason {
  value: string;
  label: string;
}

interface ContactFormModel {
  fullName: string;
  email: string;
  reason: string;
  message: string;
  privacy: boolean;
  subscribe: boolean;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {
  private readonly fb = inject(FormBuilder);

  protected readonly reasons = signal<ContactReason[]>([
    { value: 'consulta', label: 'Consulta' },
    { value: 'propuesta', label: 'Propuesta laboral' },
    { value: 'mentoria', label: 'Mentoría' },
    { value: 'otro', label: 'Otro' }
  ]);

  protected readonly contactForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    reason: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue],
    subscribe: [true]
  });

  protected readonly submitted = signal(false);
  protected readonly lastSubmission = signal<ContactFormModel | null>(null);

  protected submit(): void {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      this.submitted.set(false);
      return;
    }

    this.lastSubmission.set(this.contactForm.getRawValue());
    this.submitted.set(true);
    this.contactForm.reset({
      fullName: '',
      email: '',
      reason: '',
      message: '',
      privacy: false,
      subscribe: true
    });
  }

  protected reset(): void {
    this.contactForm.reset({
      fullName: '',
      email: '',
      reason: '',
      message: '',
      privacy: false,
      subscribe: true
    });
    this.submitted.set(false);
    this.lastSubmission.set(null);
  }

  protected showError(controlName: keyof ContactFormModel, error: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }

  protected reasonLabelFor(value: string): string {
    return this.reasons().find(reason => reason.value === value)?.label ?? value;
  }
}
