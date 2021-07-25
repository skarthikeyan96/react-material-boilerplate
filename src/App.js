import logo from './logo.svg'
import './App.css'
import Box from '@material-ui/core/Box'
import GitHubIcon from '@material-ui/icons/GitHub'
import Button from '@material-ui/core/Button'
import React from 'react'

/**
 * Renders a <App /> component
 */

const App = () => {
  return (
    <Box color='text.primary' className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <Button variant='outlined' color='primary' target='_blank' href='https://github.com/skarthikeyan96/react-material-starter'>
          {' '}
          <GitHubIcon style={{ paddingRight: '10px' }} /> <span> Github Source </span>{' '}
        </Button>
      </header>
    </Box>
  )
}

export default App
