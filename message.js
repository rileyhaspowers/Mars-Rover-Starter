class Message {
   constructor(name, commands) {
      this.name = name;
      if (!name) {
        throw Error("Name required.");
      }
      this.commands = commands || [];
    }
    makeArray(command){
      this.commands.push(command);
      let arrayOfCommands = this.commands;
      return arrayOfCommands;
    }
}

module.exports = Message;