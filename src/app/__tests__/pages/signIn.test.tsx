/**
 @jest-environment jsdom 
 */

import {render, screen} from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import SignIn from '../../components/signIn'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<SignIn />)

  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  expect(await screen.findByRole('heading'))
  expect(await screen.getByText('Login'))
})