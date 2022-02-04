const http=require("http");
const fs=require("fs");


const homeFile=fs.readFileSync("home.html","utf-8");

//console.log(homeFile);
const replaceVal=(tempval,orgval)=>
{
  let temprature=tempval.replace("{%temp%}",Math.ceil(orgval.main.temp-273.15));
  temprature=temprature.replace("{%Min_Temp%}",Math.ceil(orgval.main.temp_min-273.15));
  temprature=temprature.replace("{%Max_Temp%}",Math.ceil(orgval.main.temp_max-273.15));
  temprature=temprature.replace("{%location%}",orgval.name);
  temprature=temprature.replace("{%Country%}",orgval.sys.country);
  return temprature;
}
const server=http.createServer((req,res)=>
{
   if(req.url=="/")
   {
       var requests=require("requests");
    requests("https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=acf31eab195306c633dac3bc4b8f5876")
    .on('data', function (chunk) {
      const obj=JSON.parse(chunk);
      const arr=[obj];
     // console.log(arr[0]);
     const realTimeData=arr.map(val=>replaceVal(homeFile,val)).join();
        
     
     
      res.write(realTimeData);

    //console.log(realTimeData);
    })
    .on('end', (err)=> {
      if (err) return console.log('connection closed due to errors', err);
     
     res.end();
    }
    
    );
}






});
server.listen(8000,"127.0.0.1");



