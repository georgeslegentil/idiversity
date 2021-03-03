import React from 'react';
import { BrowseContainer } from '../containers/browse';
import { useContent } from '../hooks';
import { selectionFilter } from '../utils';

export default function Browse() {
  const { series } = useContent('series');
  const { films } = useContent('films');
  const { favoris } = useContent('favoris')
  const slides = selectionFilter({ series, films, favoris });

  return <BrowseContainer slides={slides} />;
}
