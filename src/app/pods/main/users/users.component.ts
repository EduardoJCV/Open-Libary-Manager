import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { OLMUserModel } from '../../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  public newUserOpen = false;

  public data = {
    headers: ['ID', 'NAME', 'EMAIL', 'PHONE', 'STATUS',  'ROLE', 'BARCODE'],
    data: []
  };

  private allUsers: OLMUserModel[];

  constructor(private userService: UserService) {
    setTimeout(async () => {
      this.allUsers = await userService.getAllUsers();
      this.data.data = this.allUsers.map((user: OLMUserModel) => [
        {
          type: 'text',
          text: user.id,
        },
        {
          type: 'text',
          text: `${user.firstName} ${user.lastName}`,
        },
        {
          type: 'text',
          text: user.email,
        },
        {
          type: 'text',
          text: user.phone,
        },
        {
          type: 'text',
          text: 'Active',
        },
        {
          type: 'text',
          text: 'Student',
        },
        {
          type: 'text',
          text: user.barcode,
        },
      ]);
    }, 0);
  }

  onCancelCreateUser(event: boolean) {
    this.newUserOpen = event;
  }

}
