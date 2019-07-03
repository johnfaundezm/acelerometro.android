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

  constructor(public http: Http ) {// aqui se declaran los plugins, este pluging se usa para enviar el post al servidor
    console.log('Hello WebservicesProvider Provider');
  }

  //se crea el metodo para registrar un usuario
  registrar(correo,pass,nombre,apellido_p,apellido_m,genero,edad,peso,estatura,imc,pais,estado,fecha_r,id_tipo_usuario) {//se reciben las variables para registrarse
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo +'&pass='+pass +'&nombre='+nombre +'&apellido_p='+apellido_p +'&apellido_m='+apellido_m+'&genero='+genero+'&edad='+edad+'&peso='+peso+'&estatura='+estatura+'&imc='+imc+'&pais='+pais+'&estado='+estado+'&fecha_r='+fecha_r+'&id_tipo_usuario='+id_tipo_usuario;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/insert_usuario.php";

      this.http.post(url, body, options)// se envia la url el body y el options por medio de un post al servidor
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  //se crea el metodo para actualizar un deportista
  actualizar_deportista(correo,pass,nombre,apellido_p,apellido_m,genero,edad,peso,estatura,imc,pais,estado) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo + '&pass='+pass +'&nombre='+nombre +'&apellido_p='+apellido_p +'&apellido_m='+apellido_m +'&genero='+genero +'&edad='+edad +'&peso='+peso +'&estatura='+estatura +'&imc='+imc +'&pais='+pais+'&estado='+estado;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/update_deportista.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  //se crea el metodo para actualizar un entrenador
  actualizar_entrenador(correo,pass,nombre,apellido_p,apellido_m,genero,edad,pais, estado) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo + '&pass='+pass +'&nombre='+nombre +'&apellido_p='+apellido_p +'&apellido_m='+apellido_m +'&genero='+genero +'&edad='+edad +'&pais='+pais+'&estado='+estado;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/update_entrenador.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  //se crea el metodo para consultar si existe un correo
  consulta(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/select_usuario.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  //se crea un metodo para consultar si el usuario existe y si cohincide su clave con el correo, la validacion se hace en el servidor, en el php
  consulta_login(correo, pass) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo+'&pass='+pass;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/select_login.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          console.log(data);
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

  // se crea un metodo para consultar todos los entrenadores que existen
  vista_entrenador() {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = '';
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/vista_entrenador.php";

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

  // se crea un metodo para consultar todos los deportistas que existen
  vista_deportista() {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = '';
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/vista_deportista.php";

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

  // se crea un metodo para consultar los datos de un deportista en especifico
  consulta_deportista(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/consulta_vista_deportista.php";

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

  // se crea un metodo para consultar los datos de entrenador en especifico
  consulta_entrenador(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/consulta_vista_entrenador.php";

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

  // se crea un metodo para consultar que deportista está enlazado con cierto entrenador especifico
  consulta_enlace(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/vista_enlace.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo para consultar que entrenador está enlazado con cierto deportsta especifico
  consulta_enlace_deportista(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/vista_enlace_dep.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo para consultar que deportista está enlazado con cierto entrenador especifico
  consulta_enlace_pend(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/vista_enlace_pendiente.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo para consultar que entrenador está enlazado con cierto deportista especifico
  consulta_enlace_pend_deportista(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/vista_enlace_pendiente_dep.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo para consultar que entrenador está enlazado con cierto deportista especifico
  consulta_enlace_dep(correo) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo='+correo;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/deportista_enlace.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo insertar datos del acelerometro
  acelerometro_datos(id_ent,aceleracionX, aceleracionY, aceleracionZ, aceleracion, fuerza, potencia) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'id_ent='+id_ent+'&aceleracionX='+aceleracionX+'&aceleracionY='+aceleracionY+'&aceleracionZ='+aceleracionZ+'&aceleracion='+aceleracion+'&fuerza='+fuerza+'&potencia='+potencia;//variables a enviar al php
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/insert_acc_datos.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }
  
  // se crea un metodo insertar datos del giroscopio
  giroscopio_datos(id_ent,orientacionX, orientacionY, orientacionZ, orientacion) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'id_ent='+id_ent+'&orientacionX='+orientacionX+'&orientacionY='+orientacionY+'&orientacionZ='+orientacionZ+'&orientacion='+orientacion;//variables a enviar al php
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/insert_gir_datos.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo consultar los datos del acelerometro
  consulta_acelerometro_datos(id_ent) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = 'id_ent='+id_ent;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/select_acc_datos.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo borrar los datos del acelerometro
  delete_acelerometro_datos() {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = '';
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/delete_acc_datos.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo consultar los datos del acelerometro
  consulta_giroscopio_datos(id_ent) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = 'id_ent='+id_ent;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/select_gir_datos.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo borrar los datos del giroscopio
  delete_giroscopio_datos() {//metodo que ejecuta la eliminacion de datos
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = '';
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/delete_gir_datos.php"; //direccion del php en el hosting

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo para consultar todos los usuarios que se registraron en cierta fecha especifica
  semanas(fecha_r) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'fecha_r='+fecha_r;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/semana.php";

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

  //se crea el metodo para insertar una solicitud
  insertar_solicitud(correo_solicitado,correo_solicitante,id_estado_solicitud,fecha_solicitud) {//se reciben las variables para insertar solicitud
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'correo_solicitado='+correo_solicitado +'&correo_solicitante='+correo_solicitante+'&id_estado_solicitud='+id_estado_solicitud +'&fecha_solicitud='+fecha_solicitud;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/insert_solicitud.php";

      this.http.post(url, body, options)// se envia la url el body y el options por medio de un post al servidor
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  //se crea el metodo para insertar un entrenamiento
  insertar_entrenamiento(id_solicitud_entrenamiento,tiempo_ent,tiempo_rec,fecha,tipo_entrenamiento,estado) {//se reciben las variables para insertar solicitud
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'id_solicitud_entrenamiento='+id_solicitud_entrenamiento +'&tiempo_ent='+tiempo_ent+'&tiempo_rec='+tiempo_rec +'&fecha='+fecha+'&tipo_entrenamiento='+tipo_entrenamiento+'&estado='+estado;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/insert_entrenamiento.php";

      this.http.post(url, body, options)// se envia la url el body y el options por medio de un post al servidor
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo consultar la id del entrenamiento y el estado
  estado_entrenamiento(id_solicitud_entrenamiento) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = 'id_solicitud_entrenamiento='+id_solicitud_entrenamiento;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/estado_entrenamiento.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  //se crea el metodo para actualizar el estado del entrenamiento
  actualizar_estado_entrenamiento(id,estado) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      let body = 'id='+id+ '&estado='+estado;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/actualizar_estado_entrenamiento.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo consultar la id del entrenamiento y el estado
  consultar_solicitud_por_id(id) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = 'id='+id;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/consultar_solicitud_por_id.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

  // se crea un metodo consultar la id del entrenamiento y el estado
  consultar_entrenamiento_por_id(id) {
    return new Promise( (resolve, reject) => {
      
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded" //este es la forma en que se envia el POST y se almacena en la variable headers
      });
      let options = new RequestOptions({
        headers: headers // se pasa la variable header con la forma de post a la variable options
      });
      // TODO: Encode the values using encodeURIComponent().
      //en el body se colocan las variables que van a hacer enviadas al php que se encuentra en el servidor, en el formato nombre de variable recibida igual al nombre de la variable que se envia
      // en este caso no se envian variables, por q solo se reciben datos del php
      let body = 'id='+id;
      //en la url se ingresa la direccion exacta del servidor en donde se encuentra el archivo php que se va a utilizar para recibir las variables
      let url = "http://192.81.216.141/webservices/consultar_entrenamiento_por_id.php";

      this.http.post(url, body, options)
        .map(res => res.json()) // se retorno el body como text y no como json por error en el formato de json en la pagina
        .subscribe(data => {
          //alert(JSON.stringify(data));
          if (data != 'null') resolve( data );  
          else resolve (false);
        }, error => reject(error));
    });
  }

}
