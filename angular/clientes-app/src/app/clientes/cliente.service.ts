import { Injectable } from '@angular/core';
import { formatDate, DatePipe} from '@angular/common';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ClientesComponent } from './clientes.component';

//El decorador indica que tipo clase representa en angular.
//@Inyectable=Clase Servicio.
//Se puede inyectar a otra clase.
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //EndPoint del servicio REST.
  private urlEndPoint:string='http://localhost:8080/api/clientes';

  //Cabecera http.
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  //Inyectar el HttpClient via constructor.
  constructor(private http:HttpClient, private router:Router) { }

  //Observable=Stream de datos
  //getClientes():Observable<Cliente[]>{
    //1.Si REST
    //return of(CLIENTES) ;

    //2.Con REST y CAST
    //Retorna un observable del tipo Any. Hacer un cast al tipo Cliente
    //El metodo get siempre va a retornar un tipo observable
    //Dentro del cuerpo (promesa) va a devolver y json por defecto sin tipo. Convertir al la clase Cliente
    // return this.http.get<Cliente[]>(this.urlEndPoint);

    //3.Con REST, RactxJS,CAST
    //Map convierte el tipo json dentro de la promesa. Castea al tipo Cliente
    // return this.http.get(this.urlEndPoint).pipe(
    //   map( Response => Response as Cliente[])
    // );

    //4.Con REST, Funcion anonima,CAST
    // return this.http.get(this.urlEndPoint).pipe(
    //    map( function(Response) {return Response as Cliente[]})
    //  );
  //}

  getClientes():Observable<Cliente[]>{
     return this.http.get(this.urlEndPoint).pipe(
      //  map( Response => Response as Cliente[])
      tap(response=>{
        let clientes=response as Cliente[]
        console.log('ClienteService: tap 1')
        clientes.forEach(cliente=>{
          console.log(cliente.nombre)
        })
      }),
      map( response => {
        let clientes=response as Cliente[]
        return clientes.map(cliente=>{
          cliente.nombre=cliente.nombre.toUpperCase()
          //cliente.apellido=cliente.apellido.toUpperCase()
          //Con formatDate
          // cliente.createAt=formatDate(cliente.createAt,'dd-MM-yyyy','en-US')
          //Con DatePipe
          let datePipe=new DatePipe('es')
          //cliente.createAt=datePipe.transform(cliente.createAt,'dd/MM/yyyy')
          //cliente.createAt=datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy')
          //cliente.createAt=datePipe.transform(cliente.createAt,'fullDate')
          //cliente.createAt=datePipe.transform(cliente.createAt,'fullDate')
          return cliente
        })
      }),
      tap(response=>{
        console.log('ClienteService: tap 2')
        response.forEach(cliente=>{
          console.log(cliente.nombre)
        })
      })
    );
  }

  //Metodo que retorna un observable de los tipos Clientes
  // create(cliente:Cliente):Observable<Cliente>{
  //   return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.httpHeaders})
  //   .pipe(
  //     catchError(e=>{
  //       console.error(e.error.mensaje)
  //       //Swal.fire('Error al crear el cliente', e.error.mensaje, 'error')
  //       Swal.fire(e.error.mensaje,e.error.error, 'error')
  //       return throwError(e)
  //     })
  //   )
  // }

  //Metodo que retorna un observable de los tipos Any
  // create(cliente:Cliente):Observable<any>{
  //   return this.http.post<any>(this.urlEndPoint, cliente, {headers:this.httpHeaders})
  //   .pipe(
  //     catchError(e=>{
  //       console.error(e.error.mensaje)
  //       //Swal.fire('Error al crear el cliente', e.error.mensaje, 'error')
  //       Swal.fire(e.error.mensaje,e.error.error, 'error')
  //       return throwError(e)
  //     })
  //   )
  // }

  //Metodo que retorna un observable de los tipos Cliente pero con Transformacion
  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<any>(this.urlEndPoint, cliente, {headers:this.httpHeaders})
    .pipe(
      map( response=> response.cliente as Cliente),
      catchError(e=>{
        //Para el caso que contenga varios errores 'errors'
        if(e.status==400){ //El  objeto e tiene el atributo status
          //Retornar los errores para que el compnente 'form.component.ts' lo capture en el metodo suscribe
          return throwError(e);
        }
        //Para el caso que contenga un solo mensaje de error
        console.error(e.error.mensaje)
        //Swal.fire('Error al crear el cliente', e.error.mensaje, 'error')
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e)
      })
    )
  }

  // getCliente(id): Observable<Cliente>{
  //   return this.http.get<Cliente>(this.urlEndPoint+'/'+id).
  // }

  getCliente(id): Observable<Cliente>{
    //pipe es una funcion que permite transformar datos.
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    .pipe(
      //catchError, intercepta el observable en busca de falla.
      //Canalizar el error atraves del status 404/500.
      catchError(e=>{
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje)
        Swal.fire('Error al editar', e.error.mensaje, 'error')
        return throwError(e)
      })
    )
  }

  //Metodo que retonar un observable de los tipos Clientes
  // update(cliente:Cliente):Observable<Cliente>{
  //   return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders})
  //   .pipe(
  //     catchError(e=>{
  //       console.error(e.error.mensaje)
  //       //Swal.fire('Error al actualizar', e.error.mensaje,'error')
  //       Swal.fire(e.error.mensaje,e.error.error, 'error')
  //       return throwError(e)
  //     }
  //     )
  //   )
  // }

  //Metodo que retonar un observable de los tipos Any
  // update(cliente:Cliente):Observable<any>{
  //   return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders})
  //   .pipe(
  //     catchError(e=>{
  //       console.error(e.error.mensaje)
  //       //Swal.fire('Error al actualizar', e.error.mensaje,'error')
  //       Swal.fire(e.error.mensaje,e.error.error, 'error')
  //       return throwError(e)
  //     }
  //     )
  //   )
  // }

  //Metodo que retonar un observable de los Cliente pero con Transformacion
  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders})
    .pipe(
      map(response=>response.cliente as Cliente),
      catchError(e=>{
        if(e.status==400){
          return throwError(e)
        }
        console.error(e.error.mensaje)
        //Swal.fire('Error al actualizar', e.error.mensaje,'error')
        Swal.fire(e.error.mensaje,e.error.error, 'error')
        return throwError(e)
      }
      )
    )
  }

  delete(id):Observable<Cliente>{
    //No es necesario pasar las cabeceras
    //return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders})
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`)
    .pipe(
      catchError(e=>{
        console.error(e.error.mensaje)
        //Swal.fire('Error al eliminar', e.error.mensaje,'error')
        Swal.fire(e.error.mensaje,e.error.error, 'error')
        return throwError(e)
      })
    )
  }
}
