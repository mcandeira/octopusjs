import { OctopusComponent } from "../core/OctopusComponent"

export type SimpleInput = OctopusComponent|Element|string

export type Input = SimpleInput | [SimpleInput, Record<string, any>]

export enum MarkType {special, inline, open, close}