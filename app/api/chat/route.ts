import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

export const runtime = 'edge'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
})

const openai = new OpenAIApi(apiConfig)

export async function POST(req: Request) {
  const { messages } = await req.json()
  let lastDictionary = messages[messages.length - 1];

  lastDictionary.content += ' ' + "Note: Dont reply my non legal queries and other things except greeting, if query is non legal and not greeting so just reply said i am a legal adviser i can not give these information!";
  console.log("this is message : ", messages)
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
