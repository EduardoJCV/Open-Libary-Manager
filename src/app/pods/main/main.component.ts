import { Component } from '@angular/core';

// import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  async closeApp() {
    // await ipcRenderer.send('close-app');
    console.log('closeApp');
  }

  async minimizeWindow() {
    // await ipcRenderer.send('minimize-window');
    console.log('minimizeApp');
  }

  async toggleWindowState() {
    // const isMaximized = await ipcRenderer.sendSync('get-window-state');
    // await ipcRenderer.send('toggle-window-state', isMaximized);
    console.log('toggle window size');
  }

}
