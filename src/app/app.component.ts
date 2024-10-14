import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearcherComponent } from './searcher/searcher.component';

import { CommonModule } from '@angular/common';
import { FoundUserComponent } from './found-user/found-user.component';
import { UserClass } from './user/user-class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearcherComponent, CommonModule, FoundUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crud-ui';

  user: UserClass | undefined;
  searchFile: boolean = false;

  // This method will handle the emitted user data from the SearcherComponent
  onUserFound(user: UserClass) {
    this.user = user;
    this.searchFile = !user;
  }
}
