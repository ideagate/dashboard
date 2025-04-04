import Card, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import React from 'react'

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
}

interface MainCardProps extends Omit<CardProps, 'title' | 'content'> {
  border?: boolean
  boxShadow?: boolean
  children?: React.ReactNode
  content?: boolean
  contentClass?: string
  contentSX?: object
  darkTitle?: boolean
  secondary?: React.ReactNode
  shadow?: string | number
  sx?: object
  title?: React.ReactNode
}

const MainCard = React.forwardRef<HTMLDivElement, MainCardProps>((props, ref) => {
  const {
    border = false,
    boxShadow = false,
    children,
    content = true,
    contentClass,
    contentSX,
    darkTitle = false,
    secondary,
    shadow,
    sx,
    title,
    ...rest
  } = props

  return (
    <Card
      ref={ref}
      {...rest}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: 'divider',
        ':hover': {
          boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
        },
        ...sx,
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
      {darkTitle && title && (
        <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  )
})

export default MainCard
