import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, data: any) { // Convirtiendo un objeto a un string
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  get(key: string): any {
    try {
      const value = localStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
    }
  }
  

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }

  clear(){
    try {
      return localStorage.clear()
    } catch (error) {
      console.error('Ha ocurrido un error', error);
    }
  }

}
