export type PrototypePageType = 'html' | 'url'
export type PrototypeViewport = 'PC' | 'H5'

export type PrototypeState = {
  id: string
  title: string
  description?: string
}

export type PrototypeChange = {
  id: string
  pageId?: string
  stateId?: string
  location: string
  action: string
  result: string
}

export type PrototypeFlow = {
  current: string
  steps: Array<{ id: string; title: string }>
}

export type PrototypePage = {
  id: string
  title: string
  type: PrototypePageType
  url: string
  protocol?: 'prototype-v1' | 'none'
  viewport?: PrototypeViewport
  requirements: string[]
  requirementSources?: string[]
  overview: string
  pageRole: string
  scenario?: string
  businessRules?: string[]
  illustration?: string
  hiddenInNavigation?: boolean
  changes: PrototypeChange[]
  states: PrototypeState[]
  flow?: PrototypeFlow
}

export type PrototypeData = {
  project: string
  version: string
  generatedAt: string
  pages: PrototypePage[]
}
