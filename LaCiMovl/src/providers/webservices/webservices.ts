import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebservicesProvider {

  constructor(public http: Http ) {
    console.log('Hello WebservicesProvider Provider');
  }

  registrar(correo,pass,nombre,apellido_p,apellido_m,genero,edad,peso,estatura,imc,pais,estado,fecha_r,id_tipo_usuario) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo +'&pass='+pass +'&nombre='+nombre +'&apellido_p='+apellido_p +'&apellido_m='+apellido_m+'&genero='+genero+'&edad='+edad+'&peso='+peso+'&estatura='+estatura+'&imc='+imc+'&pais='+pais+'&estado='+estado+'&fecha_r='+fecha_r+'&id_tipo_usuario='+id_tipo_usuario;

      let url = "https://lacimovl.000webhostapp.com/webservices/insert_usuario.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  actualizar_deportista(correo,pass,nombre,apellido_p,apellido_m,genero,edad,peso,estatura,imc,pais,estado) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo + '&pass='+pass +'&nombre='+nombre +'&apellido_p='+apellido_p +'&apellido_m='+apellido_m +'&genero='+genero +'&edad='+edad +'&peso='+peso +'&estatura='+estatura +'&imc='+imc +'&pais='+pais+'&estado='+estado;

      let url = "https://lacimovl.000webhostapp.com/webservices/update_deportista.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }
  actualizar_entrenador(correo,pass,nombre,apellido_p,apellido_m,genero,edad,pais) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo + '&pass='+pass +'&nombre='+nombre +'&apellido_p='+apellido_p +'&apellido_m='+apellido_m +'&genero='+genero +'&edad='+edad +'&pais='+pais;

      let url = "https://lacimovl.000webhostapp.com/webservices/update_entrenador.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  consulta(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo;

      let url = "https://lacimovl.000webhostapp.com/webservices/select_usuario.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  consulta_login(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo;

      let url = "https://lacimovl.000webhostapp.com/webservices/select_login.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          
          if (data != 'null'){
            //alert('alerta 1'+JSON.stringify(data));
            resolve( data );
          }   
          else{
            resolve (false);
          } 
        }, error => {
          reject(error)
        });
    });
  }

  vista_entrenador() {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = '';

      let url = "https://lacimovl.000webhostapp.com/webservices/vista_entrenador.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          
          if (data != 'null'){
            //alert('alerta 1'+JSON.stringify(data));
            resolve( data );
          }   
          else{
            resolve (false);
          } 
        }, error => {
          reject(error)
        });
    });
  }

  vista_deportista() {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = '';

      let url = "https://lacimovl.000webhostapp.com/webservices/vista_deportista.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          
          if (data != 'null'){
            //alert('alerta 1'+JSON.stringify(data));
            resolve( data );
          }   
          else{
            resolve (false);
          } 
        }, error => {
          reject(error)
        });
    });
  }

  consulta_deportista(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo;

      let url = "https://lacimovl.000webhostapp.com/webservices/consulta_vista_deportista.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          
          if (data != 'null'){
            //alert('alerta 1'+JSON.stringify(data));
            resolve( data );
          }   
          else{
            resolve (false);
          } 
        }, error => {
          reject(error)
        });
    });
  }

  consulta_entrenador(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo;

      let url = "https://lacimovl.000webhostapp.com/webservices/consulta_vista_entrenador.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          
          if (data != 'null'){
            //alert('alerta 1'+JSON.stringify(data));
            resolve( data );
          }   
          else{
            resolve (false);
          } 
        }, error => {
          reject(error)
        });
    });
  }



}
