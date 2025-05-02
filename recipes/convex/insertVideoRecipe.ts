import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertVideoRecipe = mutation({
  args: {
    title: v.string(),
    videoUrl: v.string(),
    cookingTime: v.number(),
    calories: v.number(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate video URL format (MP4, WebM, YouTube)
    if (
      !args.videoUrl.match(/\.(mp4|webm)$/i) &&
      !args.videoUrl.includes("youtube.com") &&
      !args.videoUrl.includes("youtu.be")
    ) {
      throw new Error("Only MP4, WebM or YouTube videos are supported");
    }

    if (args.cookingTime <= 0) {
      throw new Error("Cooking time must be a positive number");
    }

    if (args.calories <= 0) {
      throw new Error("Calories must be a positive number");
    }

    // Insert recipe
    const id = await ctx.db.insert("videoRecipes", {
      title: args.title,
      videoUrl: args.videoUrl,
      cookingTime: args.cookingTime,
      calories: args.calories,
      userId: args.userId,
      createdAt: Date.now(),
    });

    // Return inserted recipe (or its ID)
    return await ctx.db
      .query("videoRecipes")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();
  },
});
