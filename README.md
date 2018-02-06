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
