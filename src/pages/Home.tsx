import React from "react";
import qs from 'qs'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectFilter, setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { sortList } from "../components/Sort";
import {fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const {items, status} = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);


  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };


  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      // @ts-ignore
      fetchPizzas({
      sortBy,
      order,                            /// ///////////////////////////////////////////////////////////////////////////////////////////
      category,
      search,
      currentPage,
    }))

    window.scrollTo(0, 0);
  }

  // Если изменили параметры и был первый рендер

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, searchValue, currentPage,items])

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true
    }
  }, [])

  // Если был первый рендер, то запрашиваем пиццы

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false

  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items
    .filter((obj: any) => {                                                           /// ///////////////////////////////////////////
      return obj.title.toLowerCase().includes(searchValue.toLowerCase())
        ? true
        : false;
    })
    .map((obj: any) => <Link key={obj.id} to = {`/pizza/${obj.id}`}>          {/*    ///////////////////////////////////////////////  */}
      <PizzaBlock {...obj} />
    </Link>);

  const skeletons = [...new Array(12)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id: number) => onChangeCategory(id)}  // //////????????????????????????????????????????????????????????
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? 
       ( <div className="content__error-info">
          <h2>Произошла ошибка {"\u{1F615}"}</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>) : (
           <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )
      }
     
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
