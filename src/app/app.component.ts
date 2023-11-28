import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private client_ : HttpClient
  ){
  }
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  DataInput: string="";
  DataMessage:string="";
  resultBackendphp:string="";
  title = 'test_frontend';
  resultHelper:any = [];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  gCheckNumber(){
    
    return (Number(this.DataInput))?true:false;
  }
  getData(data:any, url:string){
    this.client_.post(url,data).subscribe((resp)=>{
      this.resultHelper = resp;
      });
  }
  
  gProsesBc(dt:string){
    var  isNumber;
    var url = "http://localhost:8080/checknumber";
    var inputhelper = { 'num':this.DataInput };
     this.client_.post(url,inputhelper).subscribe((resp)=>{
     isNumber = resp;
     console.log(isNumber)
     this.resultHelper = [];
    if(isNumber===true){
      this.DataMessage="";
      if(dt=="sg"){
       this.getData(inputhelper,"http://localhost:8080/getsegitiga");
      }
      else if(dt=="pr"){
        this.getData(inputhelper,"http://localhost:8080/getprima");
      }
      else{
        this.getData(inputhelper,"http://localhost:8080/getganjil");
      }
    }
    else{
      this.DataMessage="Bukan Number";
    }
  });
  }
  gProses(dt:string){
   var check= this.gCheckNumber();
   this.resultHelper = [];
   if(!check){
    this.DataMessage="Bukan Number";
   }
   else{
    this.DataMessage="";
    var num = Number(this.DataInput);
    if(dt=="gj"){
      for(var c=0;c<=num;c++){
        var isGanjil = c % 2;
          var tmp =(isGanjil==0)? c+" Bukan Bilangan Ganjil": c+" Bilangan Ganjil";
          this.resultHelper.push(tmp);
      }
    }
    else if(dt=="sg"){
      var def = "0";
        for(var x = 0;x<=this.DataInput.length;x++){
          var tmp = this.DataInput.substring(x+1,x)+def;
          console.log(tmp);
          if(x!=this.DataInput.length){
          this.resultHelper.push(tmp);
          def += "0";
          }
        }
    }
    else if(dt=="pr"){
      
    for(var s=0;s<=num;s++){
        var isPrima= true;
        for(var x = s-1;x>1; x--){
          if(s % x === 0){
            isPrima = false;
          }
        }
        var tmpresult = isPrima ? s+" Bilangan Prima": s+" Bukan Bilangan Prima";
        this.resultHelper.push(tmpresult);
       
      }
    }
    else {

    }
   }
  }
  
}
