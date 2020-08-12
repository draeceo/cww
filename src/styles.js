import { isMobile } from 'react-device-detect';

// TEXT

const text = {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: 300,
  color: '#000'
}

const heading = {
  ...text,
  fontWeight: 600,
  fontSize: 32,
  color: '#404040'
}

const body = {
  ...text,
  fontSize: 16,
  lineHeight: 1.5
}

const subBody = {
  ...body,
  color: '#ccc'
}

const navItem = {
  ...text,
  fontWeight: 700,
  fontSize: 16
}

const subHeading = {
  ...text,
  fontWeight: 700,
  fontSize: 21,
  lineHeight: 1.5
}

const mainItem = isMobile ?
{
  fontFamily: 'Baskerville',
  fontWeight: 600,
  color: '#fff',
  fontSize: 32
}
:
{
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
  subBody,
  heading,
  navItem,
  subHeading,
  mainItem,
  button
}

// COLOR

export const colors = {
  blackOverlay: 'rgb(0,0,0,0.4)'
}

// SHADOW

export const shadows = {
  box: '0 0 4px rgba(0, 0, 0, .5)'
}