import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { priceScoutFunction } from "@/inngest/functions/priceScout";

export const { GET, POST, PUT } = serve({ client: inngest, functions: [priceScoutFunction] });
