'use client';

import { useChat } from 'ai/react';
import RenderMessage from './RenderMessage';
import { CaretDoubleUp, CheckCircle, ClipboardText, PencilLine, Sparkle } from '@phosphor-icons/react';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import scrollbarHide from 'tailwind-scrollbar-hide'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [ editResponseMode, setEditResponseMode ] = useState(null)
  const [ editContent, setEditContent ] = useState('')
  const [ isEditModeOn, setEditModeOn ] = useState(false)
  const [ isResponseCopied, setIsResponseCopied ] = useState(false)
  const [ copyResponseByID, setCopyResponseById ] = useState(null)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      const cursorPosition = e.target.selectionStart;
      const updatedValue =
        input.slice(0, cursorPosition) + "\n" + input.slice(cursorPosition);
      handleInputChange({ target: { value: updatedValue } })
      setEditContent(e.target.value)
      e.target.scrollTop = e.target.scrollHeight
      e.preventDefault();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const onEditResponseMode = (messageId, content) => {
    setEditModeOn((prevState) => !prevState)
    setEditResponseMode(messageId)
    setEditContent(content)
  }
  const copyToClipboard = async (messageId) => {
    setCopyResponseById(messageId)
    setIsResponseCopied(true)
  }
  return (
    <div className="flex flex-col w-full max-w-3xl py-16 mx-auto stretch">
      {messages.map(m => {
        console.log(m.content)
        return (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-start max-sm:px-5 sm:px-5 lg:px-0`}>
            {m.role === 'assistant' && (
              <span className='mt-4 mx-4'><Sparkle size={40} className='rounded-full border p-2' /></span>
            )}
            <div className="flex flex-col gap-2 max-w-[80%]">
              <div className={`mt-4 p-3 ${isEditModeOn && editResponseMode === m.id ? '' : m.role === 'user' ? 'bg-slate-100' : 'bg-sky-100'} text-slate-800 rounded-[20px] overflow-x-auto ${isEditModeOn && m.role === 'assistant' ? '' : 'shadow-component'}`}>
                {isEditModeOn && editResponseMode === m.id ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={`px-5 rounded-[20px] focus:outline-none  min-h-[130px] min-w-[600px] bg-sky-100 scrollbar-hide ${isEditModeOn ? 'shadow-component py-3' : ''}`}
                  />
                ) : (
                  <div className="font-medium whitespace-pre-line">
                    <RenderMessage content={m.content}/>
                  </div>
                )}
              </div>
              {m.role === 'assistant' && (
                <div className='flex'>
                  <button className='mx-1 w-10' onClick={() => onEditResponseMode(m.id, m.content)}><PencilLine className='rounded-full p-2 hover:bg-gray-200' size={34} /></button>
                  <CopyToClipboard text={m.content}>
                    <button className='mx-1 w-10' onClick={() => copyToClipboard(m.id)}>{isResponseCopied && copyResponseByID === m.id ? <CheckCircle className='rounded-full p-2 hover:bg-gray-200' size={34} /> : <ClipboardText className='rounded-full p-2 hover:bg-gray-200' size={34} />}</button>
                  </CopyToClipboard>
                </div>
              )}
              {isEditModeOn && editResponseMode === m.id && (
                <div className='flex gap-4'>
                  <button onClick={() => setEditModeOn(false)} className='bg-black text-white rounded-[30px] w-24 p-1'>Batal</button>
                  <button className='bg-black text-white rounded-[30px] w-24 p-1'>Kirim</button>
                </div>
              )}
            </div>
          </div>
        )
      })}

      <div className='mt-20'>    
        <form onSubmit={handleSubmit} className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-xl'>
          <div className='flex gap-4 items-center justify-center max-sm:px-5'>
            <textarea
              className="flex-1 dark:bg-black bg-slate-100 dark:text-white text-slate-800 pt-3 pb-6 px-5 mb-8 rounded-[15px] shadow-xl mx-auto focus:outline-none focus:ring-0 placeholder:text-slate-800 dark:placeholder:text-white dark:caret-white caret-black resize-none scrollbar-hide"
              value={input}
              placeholder="Ketik apapun"
              onChange={(e) => {
                handleInputChange(e)
                const lines = e.target.value.split(/\r\n|\r|\n/).length
                e.target.style.height = `${Math.min(100 + (lines - 1) * 24, 100 + 4 * 24)}px`
              }}
              onKeyDown={(e) => handleKeyPress(e)}
              style={{
                height: `${Math.min(100 + (input.split(/\r\n|\r|\n/).length - 1) * 24, 100 + 4 * 24)}px`,
                lineHeight: '24px',
              }}
            >
            </textarea>
            <button onSubmit={handleSubmit} className='bg-black text-white p-1 rounded-full hover:bg-zinc-800 hover:text-slate-100 focus:outline-none'><CaretDoubleUp size={28} /></button>
          </div>
        </form>
      </div>
    </div>
  );
}