import { promptAtom } from '@/store'

import { Prompt } from 'expense-app'
import { useAtom } from 'jotai'

type OpenPromptProps = {
  title: string
  message: string
  onConfirm: () => void
} & Partial<Prompt>

const usePrompt = () => {
  const [state, setState] = useAtom(promptAtom)

  const closePrompt = () => setState((prevState) => ({ ...prevState, isOpen: false }))

  const openPrompt = (value: OpenPromptProps) =>
    setState({ ...value, onClose: closePrompt, isOpen: true })

  return {
    state,
    openPrompt,
    closePrompt
  }
}

export default usePrompt
