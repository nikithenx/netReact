import { Project } from "../projects/Project"
import { Tag } from "../tags/Tag"

export interface ProjectTag {
    id: number
    projectId: number
    tagId: number

    project: Project
    tag: Tag
}