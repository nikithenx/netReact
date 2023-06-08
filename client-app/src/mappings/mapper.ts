import { createMapper } from "@automapper/core";
import { pojos } from "@automapper/pojos";

export const mapper = createMapper({
    strategyInitializer: pojos()
})
