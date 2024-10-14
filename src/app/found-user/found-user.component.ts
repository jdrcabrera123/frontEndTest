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
      this.resetUser();
    }
  }

  resetUser() {
    this.user = {
      id: 0,
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      telefono: '',
      direccion: '',
      ciudad: '',
    };
  }
}
