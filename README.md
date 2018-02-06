# Corsa Pi
This is the repository of the Corsa Pi project.
## Goal
The aim of this project is to develop hardware and software to use as an entertainment system in Opel Corsa D cars.

## Hardware
Function         | Hardware
-----------------|--------------------------
Mainboard        | Raspberry Pi 3
Radio Receiver   | Si4703 Module Board
Screen           | Waveshare 7" Touchscreen
CAN Transceiver  | MCP2515 Module
CAN "Firewall"   | Arduino Nano

## Software
The Frontend is developed using Angular 5 with Angular CLI. 
To display it on the Raspberry Pi, Electron is used.

Native modules are used to communicate with the hardware such as the radio receiver, the can bus and the bluetooth OS layer.

### Angular CLI
#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
