import React, { Component } from 'react'
import Webcam from 'react-webcam';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Container } from '../styles/AddFaceStyles'

const videoConstraints = {
    width: 320,
    height: 320,
    facingMode: 'user',
};

const RECOGNIZE_FACE_MUTATION = gql`
    mutation RecognizeFaces($imageData: String!) {
        recognizeFaces(imageData: $imageData) {
            names
        }
    }
`

class RecognizeFace extends Component {
    render() {
        return <Mutation mutation={RECOGNIZE_FACE_MUTATION}>
            {(recognizeFaces, { loading }) => (
                <Container>
                    <Webcam
                        ref={this.setCamRef}
                        width="320"
                        height="320"
                        videoConstraints={videoConstraints}
                        screenshotFormat="image/jpeg" />
                    <button onClick={this.recognizeFaces(recognizeFaces)}>
                        {loading ? "Loading..." : "Add Face"}
                    </button>
                </Container>
            )}
        </Mutation>
    }

    setCamRef = (webcam) => {
        this.webcam = webcam;
    }

    recognizeFaces = recognizeFaces => async () => {
        const uncleanData = this.webcam.getScreenshot()
        const imageData = uncleanData.replace('data:image/jpeg;base64,', '')

        try {
            const response = await recognizeFaces({
                variables: {
                    imageData
                }
            })

            const {data: {recognizeFaces: {names}}} = response
            alert(JSON.stringify(names))
        } catch(err) {
            console.log(err)
            alert("Something went wrong!")
        }
    }
}

export default RecognizeFace