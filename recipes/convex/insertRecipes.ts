import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertRecipes = mutation({
  args: {
    title: v.string(),
    image: v.string(),
    cookingTime: v.float64(),
    calories: v.float64(),
    instructions: v.array(v.string()),
    ingredients: v.array(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const createdAt = Date.now();
    await ctx.db.insert("recipes", {
      ...args,
      createdAt,
    });
  },
});
