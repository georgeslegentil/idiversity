import React, { useState, useEffect, useContext } from 'react';
import Fuse from 'fuse.js';
import { Card, Header, Loading, Player } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.png';
import { FirebaseContext } from '../context/firebase';
import { SelectProfileContainer } from './profiles';
import 'firebase/firestore';





export function BrowseContainer({ slides }) {
  const [category, setCategory] = useState('series');
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [slideRows, setSlideRows] = useState([]);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  const sendFavorite = async (id) => {
    console.log(id)
    const annonceRef =  await firebase.firestore().collection('favoris')
    await annonceRef.doc(id.id).set({
      ...id
    })
  }

  const removeFavorite = async (id) => {
    const annonceRefs =  await firebase.firestore().collection('favoris')
    await annonceRefs.doc(id.id).delete();
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    setSlideRows(slides[category]);
  }, [slides, category]);


  useEffect(() => {
    const fuse = new Fuse(slideRows, { keys: ['data.description', 'data.title', 'data.genre'] });
    const results = fuse.search(searchTerm).map(({ item }) => item);

    if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
      setSlideRows(results);
    } else {
      setSlideRows(slides[category]);
    }
  }, [searchTerm]);

  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="idiversity" />
            <Header.TextLink active={category === 'series' ? 'true' : 'false'} onClick={() => setCategory('series')}>
              Nos dernières formations
            </Header.TextLink>
            <Header.TextLink active={category === 'films' ? 'true' : 'false'} onClick={() => setCategory('films')}>
              Tendances
            </Header.TextLink>
            <Header.TextLink active={category === 'favoris' ? 'true' : 'false'} onClick={() => setCategory('favoris')}>
              Favoris
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink >{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>Se déconnecter</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().currentUser.delete()}>Supprimer son compte (attention suppression immédiate)</Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>

        <Header.Feature>
          <Header.FeatureCallOut>Faire grandir le potentiel humain</Header.FeatureCallOut>
          <Header.Text>
            en permettant à chacun de s'approprier toutes ses formes d'intelligence.
          </Header.Text>
        </Header.Feature>
      </Header>

      <div style={{marginTop : 120}}>
      <Card.Group>
        {slideRows.map((slideItem) => (
          <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {category === "favoris" ? (
                <>

                  {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item}>
                    <Card.Image src={`/images/series/${item.genre}/${item.slug}/small.jpg`} />
                  {/* <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta> */}
                  <button onClick={() => removeFavorite(item)}>Remove from favorite</button>
                </Card.Item>
              ))}
                </>
              ) : (
                <>
                {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item}>
                    <Card.Image src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />
                  {/* <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta> */}
                  <button onClick={() => sendFavorite(item)}>Add to favorite</button>
                </Card.Item>
              ))}
                </>
              )}

            </Card.Entities>
            <Card.Feature category={category}>
              <Player>
                <Player.Button />
                <Player.Video src="/videos/presentation.mp4" />
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
      </div>
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
