// TEXT

const text = {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: 300,
  color: '#000'
}

const heading = {
  ...text,
  fontWeight: 600,
  fontSize: 32
}

const body = {
  ...text,
  fontSize: 16
}

const navItem = {
  ...text,
  fontWeight: 700,
  fontSize: 16
}

const mainItem = {
  fontFamily: 'Baskerville',
  fontWeight: 600,
  color: '#fff',
  fontSize: 48
}

const button = {
  ...text,
  fontSize: 16,
  fontWeight: 500,
  color: '#fff'
}

export const textStyles = {
  body,
  heading,
  navItem,
  mainItem,
  button
}

// COLOR

export const colors = {
  blackOverlay: 'rgb(0,0,0,0.4)'
}