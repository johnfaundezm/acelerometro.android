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

  registrar(correo,pass,nombre,apellido_p,apellido_m,genero,edad,peso,estatura,imc,pais,fecha_r,id_tipo_usuario) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo +'&pass='+pass +'&nombre='+nombre +'&apellido_p='+apellido_p +'&apellido_m='+apellido_m+'&genero='+genero+'&edad='+edad+'&peso='+peso+'&estatura='+estatura+'&imc='+imc+'&pais='+pais+'&fecha_r='+fecha_r+'&id_tipo_usuario='+id_tipo_usuario;

      let url = "https://lacimovl.000webhostapp.com/webservices/insert_usuario.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  actualizar(correo,pass,nombre,apellido_p,apellido_m,genero,edad,peso,estatura,imc,pais) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'correo='+correo + '&pass='+pass +'&nombre='+nombre +'&apellido_p='+apellido_p +'&apellido_m='+apellido_m +'&genero='+genero +'&edad='+edad +'&peso='+peso +'&estatura='+estatura +'&imc='+imc +'&pais='+pais;

      let url = "https://lacimovl.000webhostapp.com/webservices/update_usuario.php";

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

      let url = "https://lacimovl.000webhostapp.com/webservices/select_dep.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }



  prueba(nombre) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      let options = new RequestOptions({
        headers: headers
      });
      // TODO: Encode the values using encodeURIComponent().
      let body = 'nombre='+nombre;

      let url = "http://miciudad.sanclemente.cl/Baseon/ws/prueba.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

}
