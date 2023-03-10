// @filename: models.ts
import { Models } from "@rematch/core"
import { count } from "./count"
import { qa } from "./qa"
import { course } from "./course"
 
export interface RootModel extends Models<RootModel> {
  count: typeof count
  qa: typeof qa
  course: typeof course
}
 
export const models: RootModel = { count, qa, course }