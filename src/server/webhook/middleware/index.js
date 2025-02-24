export const apiKeyMiddleWare = (request, h) => {
  const apiKey = request.headers('x-api-key')
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return h.response({ error: 'Unauthorized' }).code(401)
  }
  return h.continue
}
