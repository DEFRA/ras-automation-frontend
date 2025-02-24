import { config } from '~/src/config/index.js'
import { createServer } from '~/src/server/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { fetchFileContent } from '~/src/server/processQueue/services/sharepointService.js'
import { queueInitialInfo, messages } from '../constants/queue-initial-data.js'
import { fetchFileInfo } from '~/src/server/common/services/getFiles.js'
import { sharePointFileinfo } from '~/src/server/common/helpers/file-info.js'
import { getSubscriptionId } from '~/src/server/common/db/data.js'

let sharePointFile

async function startServer() {
  let server

  try {
    server = await createServer()
    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(
      `Access your frontend on http://localhost:${config.get('port')}`
    )
    await getSubscriptionId()

    const fileInfo = await fetchFileInfo()
    sharePointFile = sharePointFileinfo(fileInfo)

    for (const message of messages) {
      const { filePath, fileName } = message

      // Fetch file content from SharePoint
      const fileContent = await fetchFileContent(filePath)
      const mappedFile = queueInitialInfo.find(
        (file) => file.fileName === fileName
      )
      mappedFile.data = fileContent
    }
  } catch (error) {
    const logger = createLogger()
    logger.info('Server failed to start :(')
    logger.error(error)
  }

  return server
}

export { startServer, queueInitialInfo, sharePointFile }
