'use client'

import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          id: '',
          content:
            'you are the legal adivser with 10 years of experience in UK and I am a lawyer and i want need your assist in my daily legal queries according to UK Laws. Note: Do not reply non legal queries and remeber this in future prompts as well',
          role: 'system'
        }
      ],
      api: '/api/chat'
    })

  return (
    <div>
      <ul className="divide-y">
        {messages
          .filter((m) => m.role !== 'system')
          .map((m, index) => (
            <li key={index} className="py-4">
              {m.role === 'user' ? 'User: ' : 'GPT: '}
              <span className="whitespace-pre-line">{m.content}</span>
            </li>
          ))}
      </ul>

      <div className="fixed-bottom">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            className="w-full border rounded-xl border-slate/50 py-2 px-4"
            placeholder="Say something..."
            value={input}
            onChange={handleInputChange}
          />
          <button
            className="bg-indigo-500 text-white font-semibold shadow rounded-full px-4 disabled:bg-indigo-500/50"
            type="submit"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>

    </div>
  )
}
