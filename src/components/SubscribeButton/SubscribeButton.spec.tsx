import React from 'react'

import { mocked } from 'ts-jest/utils'
import { signIn, useSession } from 'next-auth/client'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router';

import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/router');

describe('SubscribeButton component', () => {

  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton />
    )

    expect(screen.getByText('Subscriber Now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton />
    )

    const subscribeButton =  screen.getByText('Subscriber Now');

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([{
      user:{
        name:'Jhon Doe',
        email: 'jhon.doe@example.com'
      },
      activeSubscription: 'fake-active-subscription',
      expires: 'fake-expires'
    },false])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    }as any)

    render(
      <SubscribeButton />
    )

    const subscribeButton =  screen.getByText('Subscriber Now');

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts');
  })
})
