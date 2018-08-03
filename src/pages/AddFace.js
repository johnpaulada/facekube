import React, { Component } from 'react'
import Webcam from 'react-webcam';
import { navigate } from "@reach/router"
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Container } from '../styles/AddFaceStyles'

const videoConstraints = {
    width: 320,
    height: 320,
    facingMode: 'user',
};

const ADD_FACE_MUTATION = gql`
    mutation AddFace($name: String!, $imageData: String!) {
        addFace(name: $name, imageData: $imageData) {
            ok
        }
    }
`

class AddFace extends Component {
    state = {
        name: ""
    }

    render() {
        return <Mutation mutation={ADD_FACE_MUTATION}>
            {(addFace, { loading }) => (
                <Container>
                    <Webcam
                        ref={this.setCamRef}
                        width="320"
                        height="320"
                        videoConstraints={videoConstraints}
                        screenshotFormat="image/jpeg" />
                    <input onChange={this.setName} type="text" placeholder="Name" />
                    <button onClick={this.addFace(addFace)}>
                        {loading ? "Loading..." : "Add Face"}
                    </button>
                </Container>
            )}
        </Mutation>
    }

    setCamRef = (webcam) => {
        this.webcam = webcam;
    }

    setName = evt => {
        this.setState({
            name: evt.target.value
        })
    }

    addFace = addFace => async () => {
        const uncleanData = this.webcam.getScreenshot()
        const imageData = uncleanData.replace('data:image/jpeg;base64,', '')

        try {
            const response = await addFace({
                variables: {
                    name: this.state.name,
                    imageData
                }
            })

            const {data: {addFace: {ok}}} = response

            if (ok) {
                navigate('/')
            } else {
                alert("Failed to load.")
            }
        } catch(err) {
            console.log(err)
            alert("Something went wrong!")
        }
    }
}

export default AddFace