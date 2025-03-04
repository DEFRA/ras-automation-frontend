import { transformExcelData } from '~/src/server/processQueue/services/transformService.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { queueInitialInfo } from '~/src/server/common/helpers/start-server.js'
import { getSqsMessages } from '~/src/server/processQueue/services/sqsService.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { sendEmails } from '~/src/server/processQueue/services/emailService.js'

const logger = createLogger()

export const processSqsMessages = {
  handler: async (_request, h) => {
    await getSqsMessages()
    await transformExcelData(queueInitialInfo)
    logger.info('Transformed file is processed')

    // Send Email to notify Users
    await sendEmails()
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}
