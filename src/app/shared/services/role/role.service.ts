import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { OLMUserRoleModel } from '../../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private database: DatabaseService) {}

  public addRole(role: OLMUserRoleModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['roles'], 'readwrite');
      const objectStore = transaction.objectStore('roles');

      const request = objectStore.add({
        id: role.id,
        roleTitle: role.roleTitle,
        permissions: role.permissions
      });

      request.onsuccess = (event) => {
        console.log('Role added to database');
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error('Error adding Role to database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public updateRole(role: OLMUserRoleModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['roles'], 'readwrite');
      const objectStore = transaction.objectStore('roles');

      const request = objectStore.put(role);

      request.onsuccess = (event) => {
        console.log('Role updated in database');
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error('Error updating Role in database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public deleteRole(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['roles'], 'readwrite');
      const objectStore = transaction.objectStore('roles');
      const request = objectStore.delete(id);

      request.onsuccess = (event) => {
        console.log('Role deleted from database');
        resolve(() => {
          console.log('success');
        });
      };

      request.onerror = (event) => {
        console.error('Error deleting Role from database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public getRoleById(id: number): Promise<OLMUserRoleModel> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['roles'], 'readonly');
      const objectStore = transaction.objectStore('roles');
      const request = objectStore.get(id);

      request.onsuccess = (event) => {
        const role = request.result;
        if (role) {
          resolve(role);
        } else {
          reject(new Error(`No role found with id ${id}`));
        }
      };

      request.onerror = (event) => {
        console.error(`Error retrieving role with id ${id}:`, event);
        reject(event);
      };
    });
  }

  public getAllRoles(): Promise<OLMUserRoleModel[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['roles'], 'readonly');
      const objectStore = transaction.objectStore('roles');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        //@ts-ignore
        const roles = event.target.result;
        console.log('Roles fetched from database:', roles);
        resolve(roles);
      };

      request.onerror = (event) => {
        console.error('Error fetching roles from database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

  public filterRoles(filterString: string): Promise<OLMUserRoleModel[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['roles'], 'readonly');
      const objectStore = transaction.objectStore('roles');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        //@ts-ignore
        const roles = event.target.result.filter((role: OLMUserRoleModel) =>
          role.roleTitle.toLowerCase().includes(filterString.toLowerCase())
        );
        console.log('Roles filtered from database:', roles);
        resolve(roles);
      };

      request.onerror = (event) => {
        console.error('Error filtering roles from database:', event);
        reject(() => {
          console.log('error');
        });
      };
    });
  }

}
