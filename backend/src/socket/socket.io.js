const { Server } = require("socket.io");

const contactLocks = {}; 

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    socket.on('lock-contact', ({ contactId, userId }) => {
      if (contactLocks[contactId] && contactLocks[contactId] !== userId) {

        socket.emit('lock-failed', {
          contactId,
          lockedBy: contactLocks[contactId],
          message: 'This contact is currently locked by another user.'
        });
        return;
      }
  
      contactLocks[contactId] = userId;
      console.log(`User ${userId} locked contact ${contactId}`);
      socket.broadcast.emit('edit-locked', { contactId, userId });
    });
  
    socket.on('unlock-contact', ({ contactId, userId }) => {
      if (contactLocks[contactId] === userId) {
        delete contactLocks[contactId];
        socket.broadcast.emit('edit-unlocked', { contactId });
        console.log(`Contact ${contactId} unlocked by ${userId}`);
      }
    });
  
    socket.on('disconnect', () => {
    });
  });
};
