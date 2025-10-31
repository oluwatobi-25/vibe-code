"use server"
import { db } from "@/lib/db";
import { currentUser } from "@/features/auth/actions";
import { revalidatePath } from "next/cache";

export const toggleStarMarked = async (playgroundId: string, isChecked: boolean) => {
    const user = await currentUser();
    const userId = user?.id;
    if(!userId){
        throw new Error("User Id is authenticated");
}

    try {
        if (isChecked) {
            // Create a new star mark
            await db.starMark.create({
                data: {
                    userId: userId!,
                    playgroundId,
                    isMarked: isChecked,
                },
            });
        } else {
            // Remove the star mark
            await db.starMark.delete({
                where: {
                    userId_playgroundId: {
                        userId: userId!,
                        playgroundId: playgroundId,
                    },
                },
            });
        }
    } catch (error) {
        console.log("Error toggling star mark:", error);
    }
}

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
                starMarks:{
                    where: {
                        userId: user?.id!
                },
                select: {
                    isMarked: true,
                },
                },
            },
        });
        return playgrounds;
    } catch (error) {
        
    }
    return [];
}

export const createPlayground = async (data: { 
    title: string; template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR"; 
    description?: string | undefined; }) => {
        const user = await currentUser();

        const {template, title, description} = data;

        try {
            const playground = await db.playground.create({
                data: {
                    title,
                    template,
                    description,
                    userId: user?.id!,
                },
            });
            return playground;
        } catch (error) {
            console.log(error);
        }
}

export const deleteProjectById = async (id: string) => {
    try {
        await db.playground.delete({
            where: { id },

        });
        revalidatePath("/dashboard");
    }
    catch (error) {
        console.log(error);
    }
}
    
export const editProjectById = async(id:string, data:{title:string, description:string})=>{
    try {
        await db.playground.update({
            where: {
                id
            },
        data:data
    })
    revalidatePath("/dashboard")
    } catch (error) {
        console.log(error)
    }
}

export async function duplicateProjectById(id: string) {
    const user = await currentUser();

    try {
        const originalPlayground = await db.playground.findUnique({
            where: { id },
        });

        if (!originalPlayground) {
            throw new Error("Original Playground not found");
        }

        const duplicatedPlayground = await db.playground.create({
            data: {
                title: `${originalPlayground.title} (Copy)`,
                template: originalPlayground.template,
                description: originalPlayground.description,
                userId: user?.id!,
                // Add any other fields from the original playground that need to be duplicated
            },
        });

        revalidatePath("/dashboard");
        return duplicatedPlayground;
    } catch (error) {
        console.log(error);
    }
} 
