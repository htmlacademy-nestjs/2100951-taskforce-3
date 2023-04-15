import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
    await prisma.category.upsert({
        where: { categoryId: 1 },
        update: {},
        create: {
            title: 'Диплом',
            tasks: {
                create: [
                    {
                        title: 'Написать диплом',
                        description: 'Нужен диплом на тему транзиторы',
                        userId: '12345',
                        price: 45000,
                        status: 'Done',
                        city: 'SaintPetersburg',
                        response: {
                            create: {
                                message: 'Сделано в срок, сдал на 4',
                                userId: '12345',
                                rating: 5
                            }
                        },
                        comments: {
                            create: [
                                {
                                    message: 'Уточните, пожалуйста, срок исполнения',
                                    userId: '54321'
                                }
                            ]
                        }
                    },
                ]
            },
        }
    });
    await prisma.category.upsert({
        where: { categoryId: 2 },
        update: {},
        create: {
            title: 'Сантехника',
            tasks: {
                create: [
                    {
                        title: 'Починить трубу',
                        description: 'Трубу сорвало',
                        userId: '14',
                        city: 'Vladivostok',
                        status: 'New',
                        response: {
                            create: {
                                message: 'Мастер приехал быстро, почти не затопили соседа',
                                userId: '43244',
                                rating: 5
                            }
                        },
                        comments: {
                            create: [
                                {
                                    message: 'Какой адрес',
                                    userId: '56464'
                                },
                            ]
                        },
                    },
                ]
            }
        }
    });
    console.info('🤘️ Database was filled')
}

fillDb()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect()

        process.exit(1);
    })