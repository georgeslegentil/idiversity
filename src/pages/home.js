import React from 'react';
import { Feature, OptForm } from '../components';
import { HeaderContainer } from '../containers/header';
import { JumbotronContainer } from '../containers/jumbotron';

export default function Home() {
  return (
    <>
      <HeaderContainer>
        <Feature>
          <Feature.Title>Faire grandir le potentiel humain</Feature.Title>
          <Feature.SubTitle>en permettant à chacun de s'approprier toutes ses formes d'intelligence.</Feature.SubTitle>
        </Feature>
      </HeaderContainer>
      <JumbotronContainer />
    </>
  );
}
