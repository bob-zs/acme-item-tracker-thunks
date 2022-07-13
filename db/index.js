const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_item_tracker_db');

const { STRING, INTEGER } = Sequelize;

const User = conn.define('user', {
  name: {
    type: STRING 
  },
  ranking: {
    type: INTEGER,
    defaultValue: 5,
  }
});

const Thing = conn.define('thing', {
  name: {
    type: STRING 
  },
  ranking: {
    type: INTEGER,
    defaultValue: 1
  }
});

Thing.belongsTo(User);
User.hasMany(Thing);
Thing.addHook('beforeValidate', async (thing) => {
  if(!thing.userId){
    thing.userId = null;
    return;
  }

  const newOwner = await User.findByPk(thing.userId, { include: [Thing] });
  if(newOwner.things.length >= 3){
    throw new RangeError('A user can have a max of 3 things');
  }
});

module.exports = {
  conn,
  User,
  Thing
};
