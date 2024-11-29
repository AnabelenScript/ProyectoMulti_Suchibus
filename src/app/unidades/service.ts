import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from './unidadModel';
import { map } from 'rxjs/operators';  // Asegúrate de importar map de rxjs/operators
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private apiUrl = 'http://127.0.0.1:5000/unidades';
  private imageURL = 'http://127.0.0.1:5000/drive/download'

  constructor(private http: HttpClient) {}

  obtenerUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.apiUrl}`);
  }
  
  obtenerUnidadesPorTerminal(terminalId: number): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.apiUrl}/terminal/${terminalId}`)
  }


  downloadImage(id: string | SafeUrl): Observable<any> {
    const imageUrl = `${this.imageURL}/${id}`; 
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
  
  
  obtenerUnidad(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((unidad: any) => {
        if (unidad.imagen_url) {
          this.downloadImage(unidad.imagen_url).subscribe((blob: Blob) => {
            const imageUrl = URL.createObjectURL(blob);
            unidad.imagen_blob = imageUrl; 
          });
        }
        return unidad;
      })
    );
  }
  crearUnidad(data: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data)); 
    if (file) {
      formData.append('file', file, file.name);
    }
    
    console.log('Datos:', data);  
    console.log('Archivo:', file);  
    return this.http.post(`${this.apiUrl}`, formData, {
      headers: {
        'Accept': 'application/json', 
      },
      observe: 'response'
    });
  }
  

  
  actualizarUnidad(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarUnidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}