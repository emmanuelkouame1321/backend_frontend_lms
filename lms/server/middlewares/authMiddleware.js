import { clerkClient, getAuth } from "@clerk/express";

// Middleware (protect Educator Routes)
export const protectEducator = async (req, res, next) => {
    try {
        // Récupérer correctement l'utilisateur
        const { userId } = getAuth(req);

        // Vérifier si connecté
        if (!userId) {
            return res.json({ success: false, message: "Not Authenticated" });
        }

        // Récupérer les infos utilisateur
        const user = await clerkClient.users.getUser(userId);

        // Vérifier le rôle
        if (user.publicMetadata?.role !== "educator") {
            return res.json({ success: false, message: "Unauthorized Access" });
        }

        next();

    } catch (error) {
        console.error(error); // 👈 debug
        res.json({ success: false, message: error.message });
    }
};