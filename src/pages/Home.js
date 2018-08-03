import React, { Component } from 'react';

import { Container, RouteLink, LinkText } from '../styles/HomeStyles'

class Home extends Component {
    render() {
        return  <Container>
            <RouteLink to="/add-face">
                <LinkText>Add Face</LinkText>
            </RouteLink>
            <RouteLink to="/recognize-face">
                <LinkText>Recognize Face</LinkText>
            </RouteLink>
        </Container>
    }
}

export default Home