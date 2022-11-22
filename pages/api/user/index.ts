import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { prisma } from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const {id, firstName, lastName, email, password, gender, age, height, weight } = req.body;
    // const data = await axios.get("https://randomuser.me/api/");
    const imgUrl = "qweqwe"
    switch (req.method) {
        case "GET":
            const user = await prisma.user.findFirst({ where: { email } });
            if (!user) {
                return res.status(400).json("user not found");
            }
            res.status(200).json({ user });
            break;
        case "POST":
            try {
                const newUser = await prisma.user.create({
                    data: {
                        id,
                        firstName,
                        lastName,
                        email,
                        password,
                        gender,
                        age,
                        height,
                        weight,
                        imgUrl,
                    },
                });
                res.status(200).json({ newUser });
            } catch (error) {
                console.log(error)
                res.status(400).json({
                    massage: console.log(error)
                })
            }
            break;
        default:
            res.status(404).json("Not Found!");
    }
}
