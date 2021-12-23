import { FunctionComponent } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/react'

//
export interface LinkProps
  extends NextLinkProps,
    Omit<ChakraLinkProps, 'as' | 'href'> {}

/**
 * Use charka-ui links with nextjs links
 */
const LinkComponent: FunctionComponent<LinkProps> = ({
  as,
  children,
  href,
  locale,
  prefetch,
  replace,
  scroll,
  shallow,
  ...chakraLinkProps
}) => {
  return (
    <NextLink
      as={as}
      href={href}
      locale={locale}
      passHref
      prefetch={prefetch ?? false}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <ChakraLink {...chakraLinkProps}>{children}</ChakraLink>
    </NextLink>
  )
}

export default LinkComponent
