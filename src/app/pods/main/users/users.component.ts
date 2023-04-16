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
  public loadingData = true;

  public data = {
    headers: ['ID', 'NAME', 'EMAIL', 'PHONE', 'STATUS',  'ROLE', 'BARCODE'],
    data: []
  };

  private allUsers: OLMUserModel[];

  constructor(private userService: UserService) {
    this.loadingData = true;
    setTimeout(async () => {
      this.allUsers = await userService.getAllUsers();
      await this.defineAllUsers();
      this.loadingData = false;
    }, 0);
  }

  public onCancelCreateUser(event: boolean) {
    this.newUserOpen = event;
    this.updateAllUsers();
  }

  public onSearchUser(input: string) {
    this.loadingData = true;
    setTimeout(async () => {
      this.allUsers = await this.userService.filterUsers(input);
      await this.defineAllUsers();
      this.loadingData = false;
    }, 0);
  }

  private updateAllUsers() {
    this.loadingData = true;
    setTimeout(async () => {
      this.allUsers = await this.userService.getAllUsers();
      this.loadingData = false;
    }, 1000);
  }

  private defineAllUsers() {
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
  }

}
