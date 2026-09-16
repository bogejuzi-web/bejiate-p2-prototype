export type PrototypeMessageType =
  | 'prototype:ready'
  | 'prototype:set-mode'
  | 'prototype:scenario'
  | 'prototype:highlight'
  | 'prototype:context'
  | 'prototype:simulate'
  | 'prototype:reset'
  | 'prototype:page-ready'
  | 'prototype:state-changed'
  | 'prototype:highlight-result'
  | 'prototype:navigation-request'
  | 'prototype:error'

export type PrototypeMessage = {
  type: PrototypeMessageType
  pageId?: string
  scenarioId?: string
  changeId?: string
  context?: Record<string, unknown>
  success?: boolean
  message?: string
}
