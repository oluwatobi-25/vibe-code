"use server"
import { db } from "@/lib/db";
import { currentUser } from "@/features/auth/actions";

export const getAllPlaygroundForUser = async () => {
    // Logic to fetch all playgrounds for a specific user
    const user = await currentUser();

    try {
        const playgrounds = await db.playground.findMany({
            where: {
                userId: user?.id,
            },
            include: {
                user: true,
            },
        });
        return playgrounds;
    } catch (error) {
        
    }
    return [];
}