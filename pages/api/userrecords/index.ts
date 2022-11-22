import { getUser } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function sendUserLog(req: NextApiRequest, res: NextApiResponse) {
    try {
        
        const { workoutLineId, reps, step, weight } = req.body
        const current = await getUser({ req, res })
        await prisma.userRecord.create({
            data: {
                userId: current.user.id,
                workoutLineId,
                reps,
                step,
                weight,
            }
        })
        res.status(201).send('new user log created')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}