import { query } from "../_generated/server";
import { v } from "convex/values";

export const getUserRecipes = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const [recipes, videoRecipes] = await Promise.all([
      ctx.db
        .query("recipes")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .order("desc")
        .collect(),
      ctx.db
        .query("videoRecipes")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .order("desc")
        .collect(),
    ]);

    return [
      ...recipes.map((r) => ({ ...r, _type: "regular" })),
      ...videoRecipes.map((r) => ({ ...r, _type: "video" })),
    ].sort((a, b) => b._creationTime - a._creationTime);
  },
});
