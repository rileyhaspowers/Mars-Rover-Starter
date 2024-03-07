const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
// //  However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);

describe("Message class", function() {
    
    it("throws error if a name is NOT passed into the constructor as the first parameter", () =>{
        expect( function() { new Message();}).toThrow(new Error('Name required.'));
      });
    
      it("constructor sets name", () => {
        const testName = new Message(message.name, commands);
        expect(testName.name).toBe('Test message with two commands');
      })
    
      it("contains a commands array passed into the constructor as the 2nd argument", () => {
        const testArray = new Message(message.name, commands);
        expect(testArray.commands).toBe(commands);
      })
});
   