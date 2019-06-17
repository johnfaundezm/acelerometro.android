gyrascope(){

    let options: GyroscopeOptions = {
      frequency: 1000
   };
   
   this.gyroscope.getCurrent(options)
     .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestampd=orientation.timestamp;

      })
     .catch()
   
   
   this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
         console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
         this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestamp=orientation.timestamp;
      });
}

Accelerometer(){
      
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
      console.log(acceleration),
  
    //  (error: any) => console.log(error)

    );
    
    // Watch device acceleration
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;
  });

}

intervale(){
    var intervalVar = setInterval(function(){
       this.timer++;
   }.bind(this),1000)
}

startTimer(){
    this.timerVar = Observable.interval(1000).subscribe ( x=>{
      console.log(x)
      this.timerVal = x;

      if( x == 10 ){
        this.timerVar.unsubscribe()
        alert('Entrenamiento terminado');
      }
    })
}

Accelero(){
    var tiempo =10;
    var i=0 ;
    this.vectorX[0] = 0;
    this.vectorY[0] = 0;
    this.vectorZ[0] = 0;

    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
      console.log(acceleration),
  
    
    );
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;
      if(this.accX != this.vectorX[i]){
        this.vectorX[i] = this.accX;
        i++;
        if (i==(tiempo-1)){
          subscription.unsubscribe();
        }
      }
    })
};