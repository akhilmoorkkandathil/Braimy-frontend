import { Injectable } from '@angular/core';
import { CustomWindow } from '../../interfaces/customWindow';


function _window(): CustomWindow {
  // return the global native browser window object
  return window as CustomWindow;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor() { }

  get nativeWindow(): CustomWindow {
    return _window();
  }

}
