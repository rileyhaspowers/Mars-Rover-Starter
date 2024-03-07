const Command = require('./command');
const Message = require('./message');

class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }

   receiveMessage(message) {
      let messageObject = {
         message: message.name,
         results: []
      }

      for (let i = 0; i < message.commands.length; i++) {
         let result = {};
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            let roverStatus = { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position };
            result.completed = true;
            result.roverStatus = roverStatus;
         }
         if (message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value;
            result.completed = true;
         }
         if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               result.completed = false;
            }
            else {
               this.position = message.commands[i].value;
               result.completed = true;
            }
         } 
         messageObject.results.push(result);
      }
      return messageObject;
   }
}


module.exports = Rover;

let rover = new Rover(100);
let commands = [
   new Command('MOVE', 4321),
   new Command('STATUS_CHECK'),
   new Command('MODE_CHANGE', 'LOW_POWER'),
   new Command('MOVE', 3579),
   new Command('STATUS_CHECK')
];
let message = new Message('TA power', commands);
let response = rover.receiveMessage(message);

console.log(response);

// console.log(JSON.stringify(response, null, 2));