import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { home } from '~/src/server/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { about } from '~/src/server/about/index.js'
import { processQueue } from '../server/processQueue/index.js'
import { webHook } from '../server/webhook/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([home, about])

      // Static assets
      await server.register([serveStaticFiles])

      // Application specific routes, add your own routes here.
      await server.register([processQueue])
      await server.register([webHook])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
