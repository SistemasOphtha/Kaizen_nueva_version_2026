import Portfolio from '../models/Portfolio';
import Third from '../models/Third';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import User from '../models/User';

const getQuicks = async (req: any, res: any) => {
    const rol = req.rol;
    try {
        const third = await ThirdsPortfolio.findAll({
            include: [{
                model: Third,
                attributes: [
                    'id',
                    'name',
                ]
            },
            {
                model: Portfolio,
                attributes: [
                    'id',
                    'name',
                ],
                include: [{
                    model: User,
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'email',
                        'category',
                        'coordinatorId'
                    ]
                }]
            }],
            where: {
                approved: false
            }
        });
        
        let reminders = [];

        if (rol === "Administrador") {

            const grouped = third.reduce((acc, current) => {
                const portfolioId = current.dataValues.portfolioId;
                if (!acc[portfolioId]) {
                    acc[portfolioId] = {
                        count: 0,
                        user: current.dataValues.portfolio.user
                    };
                }
                acc[portfolioId].count++;
                return acc;
            }, {});

            reminders = Object.values(grouped);
        } else if (rol === "Coordinador") {

            const grouped = third.reduce((acc, current) => {
                const user = current.dataValues.portfolio.user;
                if (user && user.coordinatorId === req.userId) {
                    const portfolioId = current.dataValues.portfolioId;
                    if (!acc[portfolioId]) {
                        acc[portfolioId] = {
                            count: 0,
                            user: user
                        };
                    }
                    acc[portfolioId].count++;
                }
                return acc;
            }, {});

            reminders = Object.values(grouped);
        }

        console.log({reminders});
        

        const data = [{
            events: [],
            notes: [],
            reminders: reminders.map((re) => {
                return {
                    id: re.user.id,
                    title: "Pendiente por aprobación",
                    description: `El representante ${re.user.firstName} ${re.user.lastName} tiene ${re.count} paneles sin aprobar.`,
                    details: {
                        user: {
                            id: re.user.id,
                            firstName: re.user.firstName,
                            lastName: re.user.lastName
                        }
                    },
                }
            })
        }]

        res.json(data);
    } catch (error) {
        console.error(error);
    }
}

export {
  getQuicks
};
