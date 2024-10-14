import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClass } from '../user/user-class';

@Component({
  selector: 'app-found-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './found-user.component.html',
  styleUrl: './found-user.component.css',
})
export class FoundUserComponent {
  @Input() user: UserClass | null | undefined = null;

  ngOnChanges() {
    if (!this.user) {
      this.resetUser(); // Call the method to reset user values
    }
  }

  resetUser() {
    this.user = {
      id: 0, // or null, depending on your logic
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      telefono: '',
      direccion: '',
      ciudad: '',
    }; // Set default values for all properties
  }
}
