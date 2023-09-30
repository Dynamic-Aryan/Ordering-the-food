import React, { useEffect, useReducer } from 'react';
import { getAll, getAllByTag, getAllTags, search } from '../../services/foodservice';
import Thumbnails from '../../components/Header/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then((loadedTags) => dispatch({ type: 'TAGS_LOADED', payload: loadedTags }));
    const loadFoods =
      tag ? getAllByTag(tag) : searchTerm ? search(searchTerm) : getAll();
    loadFoods.then((loadedFoods) => dispatch({ type: 'FOODS_LOADED', payload: loadedFoods }));
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      <Thumbnails foods={foods} />
    </>
  );
}
