import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { UserClass } from '../user/user-class';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css',
})
export class SearcherComponent implements OnInit {
  // Set initial value to indicate "Elige tu documento"
  selectedDocument = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  documentCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(11),
      Validators.pattern(/^\d+$/),
    ],
  });

  @Output() userFound = new EventEmitter<UserClass | undefined>();

  loading = false;
  showUserDetails = false;
  searchFailed = false;
  user?: UserClass;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  get canSubmit(): boolean {
    return this.selectedDocument.valid && this.documentCtrl.valid;
  }

  loadUser(): void {
    this.loading = true;

    if (this.isPassportSelected()) {
      this.handlePassportSelection();
      return;
    }

    const id = this.documentCtrl.value;
    if (!id) {
      this.loading = false;
      return;
    }

    this.fetchUserById(Number(id));
  }

  private isPassportSelected(): boolean {
    return this.selectedDocument.value === 'passport';
  }

  private handlePassportSelection(): void {
    this.resetUserState();
    this.userFound.emit(undefined);
  }

  private fetchUserById(id: number): void {
    this.userService.get(id).subscribe(
      (user) => this.handleUserFetchSuccess(user),
      (error) => this.handleUserFetchError(error)
    );
  }

  private handleUserFetchSuccess(user: UserClass): void {
    this.user = user;
    this.userFound.emit(user);
    this.showUserDetails = true;
    this.searchFailed = false;
    this.loading = false;
    console.log('Nombre y Primer apellido:', user.nombre, user.primerApellido);
  }

  private handleUserFetchError(error: any): void {
    this.resetUserState();
    this.userFound.emit(undefined);
    console.error('Error fetching user:', error);
  }

  private resetUserState(): void {
    this.showUserDetails = false;
    this.searchFailed = true;
    this.loading = false;
  }

  formatNumber(value: string | null): string {
    return value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  }

  thousandSeparators(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const thousandsSeparatorValue = inputElement.value.replace(/,/g, '');
    this.documentCtrl.setValue(thousandsSeparatorValue);
  }
}
