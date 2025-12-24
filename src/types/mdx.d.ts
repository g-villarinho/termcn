declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  export default function MDXContent(props: MDXProps): JSX.Element
  export const frontmatter: {
    title: string
    description: string
    order?: number
    published?: boolean
  }
}

declare module 'mdx/types' {
  export interface MDXProps {
    components?: Record<string, React.ComponentType<any>>
    [key: string]: any
  }
}
