export default function selectionFilter({ series, films, favoris } = []) {
  console.log(favoris);
  return {
    series: [
      { title: 'Diversité des intelligences', data: series?.filter((item) => item.genre === 'documentaries') },
      { title: 'Biais cognitifs', data: series?.filter((item) => item.genre === 'comedies') },
      { title: 'Plasticité cérébrale', data: series?.filter((item) => item.genre === 'children') },

    ],
    films: [
      { title: 'Tendances', data: films?.filter((item) => item.genre === 'children') },
    ],
    favoris: [
      { title: 'Favoris', data: favoris?.filter((item) => item.genre === "documentaries" || item.genre === 'thriller'|| item.genre === 'drama')  },
    ],
  };
}
