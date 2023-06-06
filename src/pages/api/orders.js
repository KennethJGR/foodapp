import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    // GET /api/orders
    const orders = await prisma.order.findMany({
        where: {
            state: false,
        },
    });

    res.status(200).json(orders);

    // POST /api/orders
    if (req.method === "POST") {
        const order = await prisma.order.create({
            data: {
                name: req.body.name,
                date: req.body.date,
                total: req.body.total,
                order: req.body.order,
            },
        });

        res.status(200).json(order);
    }
}
