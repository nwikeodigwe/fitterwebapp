import type { ReactNode } from "react"
import { Form } from "react-aria-components"

const Index = ({children}: {children: ReactNode}) => {
  return (
    <Form >{children}</Form>
  )
}

export default Index