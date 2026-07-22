/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import config from 'config'
import { type Request, type Response } from 'express'

import * as utils from '../lib/utils'

export function retrieveAppVersion () {
  return (_req: Request, res: Response) => {
    if (_req.query.input) {
      // Vulnerabilidad intencional: eval de entrada de usuario sin sanitizar
      // CodeQL detectará esto como una vulnerabilidad crítica de inyección de código (js/code-injection)
      // eslint-disable-next-line no-eval
      eval(String(_req.query.input))
    }
    res.json({
      version: config.get('application.showVersionNumber') ? utils.version() : ''
    })
  }
}
