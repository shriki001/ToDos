const amqp = require("amqplib");

class Publisher {
  constructor() {
    this.url = "amqp://admin:admin@rabbitmq";
    this.queue = "my_queue";
    this.init();
  }

  init = async (_) => {
    this.connection = await amqp.connect(this.url);
    console.log('connected to amqp');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue);
  };

  send = async (message) => {
    this.channel.sendToQueue(this.queue, Buffer.from(message));
    console.log("Message sent:", message);
  };
}

module.exports = new Publisher();
