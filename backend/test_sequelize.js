const dbConection = require('./src/database').default;
const Workplan = require('./src/models/Workplan').default;
const User = require('./src/models/User').default;
const Region = require('./src/models/Region').default;
const TypeEvent = require('./src/models/TypeEvent').default;
const { Op } = require('sequelize');

async function main() {
  await dbConection.authenticate();
  console.log('Connected via Sequelize');

  const workplans = await Workplan.findAll({
    include: [
      {
        model: User,
        required: true,
        include: [
          {
            model: Region,
            required: false
          }
        ]
      },
      {
        model: TypeEvent,
        required: true
      }
    ],
    where: {
      startDate: {
        [Op.gte]: new Date('2026-06-01T00:00:00.000Z')
      },
      endDate: {
        [Op.lte]: new Date('2026-06-07T00:00:00.000Z')
      }
    }
  });

  console.log(`Sequelize found ${workplans.length} workplans:`);
  workplans.forEach(w => {
    console.log(`- ID: ${w.id}, User: ${w.user.firstName} ${w.user.lastName}, Desc: ${w.description}`);
  });

  await dbConection.close();
}

main().catch(console.error);
