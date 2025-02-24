import { webHookController } from '../webhook/controllers/index.js'
/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const webHook = {
  plugin: {
    name: 'webHook',
    register: (server) => {
      server.route([
        {
          method: 'POST',
          path: '/api/webhook',
          // options: {
          //   pre: [
          //     {
          //       method: apiKeyMiddleWare,
          //       assign: 'auth'
          //     }
          //   ]
          // },
          ...webHookController
        }
      ])
    }
  }
}

export { webHook }
