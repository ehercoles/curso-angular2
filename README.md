Install Node.js from nodejs.org  
(includes npm: a dependency manager)  
  
Install TypeScript (via cmd)  
npm install -g typescript  
  
Install Angular (via cmd)  
npm install -g @angular/cli  
ng version  
  
TypeScript compiler (transpiler)  
tsc hello-typescript/main.ts  
Hint: supports decorator (similar to annotation in Java/C#)  
  
New Project  
ng new primeiro-projeto  
cd primeiro-projeto  
Compile: ng serve  
  
New Module  
ng g module cursos  
  
New Component  
ng g c cursos  
  
New Service  
ng g s cursos/cursos  
  
Bootstrap (Aula 118)  
npm install bootstrap --save  
npm install ngx-bootstrap --save (replaces jQuery UI)  
  
Build  
ng build  
ng build --prod (minified)  
  
Install HTTP Server  
npm install http-server -g  
  
Run HTTP Server  
http-server  
  
Na aula 40 vimos que:  
diferentes módulos que instanciam o mesmo serviço compartilham a instância (singleton);  
diferentes componentes que instanciam o mesmo serviço possuem suas próprias instâncias.  
  
Rotas  
npm install materialize-css --save  
npm install angular2-materialize --save  
npm install jquery@^2.2.4 --save  
npm install hammerjs --save  
  
Simulador Servidor REST (JSON Server)  
npm install -g json-server  
Usage: json-server --watch db.json  
Alternative: Mockoon: https://mockoon.com/  
  
File Upload back-end (Aula 136)  
https://github.com/expressjs/body-parser  
npm i -save express body-parser connect-multiparty cors  
  