import React, { Component } from 'react';
import Resource from './Resource';
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  cursor: pointer;
`;

const Container = styled.div`
  padding: 2rem;
  font-size: 1.8rem;
`;

const Green = styled.div`
  color: seagreen;
  display: flex;
`;

const Box = styled.div`
  padding: 1rem;
`;

const test = e => {
  console.log(e.target);
};

class App extends Component {
  render() {
    return (
      <Container>
        <Green>
          <Resource
            wonderland={passedState => {
              return passedState.distances.map(singleElement => (
                <Box key={singleElement}>{singleElement}</Box>
              ));
            }}
          />
        </Green>

        <Resource
          wonderland={(passedState, isVisible) => {
            return passedState.distances.map(singleElement => (
              <React.Fragment key={singleElement}>
                <Button onClick={isVisible}>{singleElement}</Button>
              </React.Fragment>
            ));
          }}
        />

        {/* <Resource
          wonderland={passedState => {
            return passedState.distances.map(singleElement =>
              singleElement > 100 ? (
                <p key={singleElement}>{singleElement}</p>
              ) : (
                <p key={singleElement}>{singleElement} jest mniejszy niz 100</p>
              )
            );
          }}
        />

        <Resource
          wonderland={passedState => {
            return passedState.name.map(singleElement => (
              <p key={singleElement}>{singleElement}</p>
            ));
          }}
        />

        <Resource
          wonderland={passedState => (
            <div>
              <p>{passedState.visible ? 'VISIBLE' : 'NONE'}</p>
            </div>
          )}
        /> */}
      </Container>
    );
  }
}

export default App;
