import React from "react";
import { useDispatch, useSelector } from 'react-redux'

import { setCategoryId } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch()
  const {categoryId, sort } = useSelector(state => state.filter)
 
  const onChangeCategory = (id) => { dispatch(setCategoryId(id)) }

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext)
     
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://6897007d250b078c2040b203.mockapi.io/pizzaDirect?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}` + search
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.filter((obj) => {
    return (obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false)
  }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(12)].map((_, index) => (<Skeleton key={index} />));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => onChangeCategory(id)} //          /////////////////////////////////////////////
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
