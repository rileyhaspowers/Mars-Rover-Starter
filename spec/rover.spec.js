const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", () => {
    commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    message = new Message('Test message with two commands', commands);
    rover = new Rover(98382);
    response = rover.receiveMessage(message);
    
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('LOW_POWER');
    expect(rover.generatorWatts).toBe(110);
  })

  it("response returned by receiveMessage contains the name of the message", () => {
    commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    message = new Message('Test message with two commands', commands);
    rover = new Rover(98382);
    response = rover.receiveMessage(message);

    expect(response.name).toBe(message.message);
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; // THIS IS TWO COMMANDS
    message = new Message('Test message with two commands', commands); //THIS IS THE MESSAGE WITH AN ARRAY OF TWO COMMANDS AT THE END AND THE TITLE "TEST MESSAGE"
    rover = new Rover(98382);
    response = rover.receiveMessage(message); 
    
    expect(response.results.length).toBe(2);
  })

  it("responds correctly to the status check command", () => {
    commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    message = new Message('Test message with two commands', commands);
    rover = new Rover(98382);
    response = rover.receiveMessage(message);

    expect(response.results[1].roverStatus.mode).toBe('LOW_POWER');
    expect(response.results[1].roverStatus.generatorWatts).toBe(110);
    expect(response.results[1].roverStatus.position).toBe(98382);

  })

  it("responds correctly to the mode change command", () => {
    commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    message = new Message('Test message with two commands', commands);
    rover = new Rover(98382);
    response = rover.receiveMessage(message);

    expect(rover.mode).toBe('LOW_POWER');
    expect(response.results[0].completed).toBe(true);
  })

  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 4321)];
    message = new Message('Test message with two commands', commands);
    rover = new Rover(98382);
    response = rover.receiveMessage(message);

    expect(rover.position).toBe(98382);
    expect(response.results[1].completed).toBe(false);
  })

  it("responds with the position for the move command", () => {

    commands = [new Command('MOVE', 4321)];
    message = new Message('Test message with two commands', commands);
    rover = new Rover(98382);
    response = rover.receiveMessage(message);

    expect(rover.position).toBe(4321);
  })
});

