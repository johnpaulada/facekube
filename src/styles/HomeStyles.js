import styled from 'styled-components'
import { Link } from "@reach/router"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #333;
    justify-content: space-evenly;
    align-items: center;
`

export const RouteLink = styled(Link)`
    text-decoration: none;
`

export const LinkText = styled.span`
    color: #FAFAFA;
    font-family: Roboto, sans-serif;
    font-weight: 100;
    font-size: calc(5vw + 1em);
`