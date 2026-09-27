import type { ShoppingState } from "@/types/shopping";

export async function supervisorAgent(state: ShoppingState): Promise<ShoppingState> {
  return { ...state, status: "scouting", error: null };
}
