import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const builder = createServerFn({ method: "POST" });
type BuilderMethods = keyof typeof builder;
const dummy: BuilderMethods = "invalid_key_to_force_error";
