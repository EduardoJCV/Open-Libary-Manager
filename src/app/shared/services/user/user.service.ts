import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { OLMUserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database: DatabaseService) {}

  public addUser(user: OLMUserModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readwrite');
      const objectStore = transaction.objectStore('users');

      const request = objectStore.add({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        prifileImage: user.profileImage,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        username: user.username,
        password: user.password,
        barcode: user.barcode,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive,
        role: user.role
      });

      request.onsuccess = (event) => {
        console.log('User added to database');
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error('Error adding user to database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public updateUser(user: OLMUserModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readwrite');
      const objectStore = transaction.objectStore('users');
      const request = objectStore.put(user);

      request.onsuccess = (event) => {
        console.log(`User with id ${user.id} updated in database`);
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error(`Error updating user with id ${user.id} in database:`, event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public deleteUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readwrite');
      const objectStore = transaction.objectStore('users');
      const request = objectStore.delete(id);

      request.onsuccess = (event) => {
        console.log(`User with id ${id} deleted from database`);
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error(`Error deleting user with id ${id} from database:`, event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public getUserById(id: number): Promise<OLMUserModel> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readonly');
      const objectStore = transaction.objectStore('users');
      const request = objectStore.get(id);

      request.onsuccess = (event) => {
        //@ts-ignore
        const user = event.target.result;
        console.log(`User with id ${id} retrieved from database`);
        resolve(user);
      };

      request.onerror = (event) => {
        console.error(`Error retrieving user with id ${id} from database:`, event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public getAllUsers(): Promise<OLMUserModel[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readonly');
      const objectStore = transaction.objectStore('users');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        //@ts-ignore
        const users = event.target.result;
        console.log('Users retrieved from database:', users);
        resolve(users);
      };

      request.onerror = (event) => {
        console.error('Error retrieving users from database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public filterUsers(filterString: string): Promise<OLMUserModel[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readonly');
      const objectStore = transaction.objectStore('users');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        //@ts-ignore
        const users = event.target.result.filter((user: OLMUserModel) =>
          user.firstName.toLowerCase().includes(filterString.toLowerCase()) ||
          user.lastName.toLowerCase().includes(filterString.toLowerCase()) ||
          user.email.toLowerCase().includes(filterString.toLowerCase()) ||
          user.phone.toLowerCase().includes(filterString.toLowerCase()) ||
          user.username.toLowerCase().includes(filterString.toLowerCase())
        );
        console.log('Users filtered from database:', users);
        resolve(users);
      };

      request.onerror = (event) => {
        console.error('Error filtering users from database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public randomUserBarcode(): string {
    let barcode = 'U-';
    const characters = '0123456789';
    for (let i = 0; i < 13; i++) {
      barcode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return barcode;
  }

}
