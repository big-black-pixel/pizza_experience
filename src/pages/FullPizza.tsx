import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link} from "react-router-dom";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
      imageUrl: string,
      title: string,
      price: number,
    }>({
      imageUrl: '',
      title: '',
      price: 0,
    })
    const {id} = useParams()
    console.log(id)

    React.useEffect(() => {
        async function fetchPizza(){
            try {
                const {data} = await axios.get(`https://6897007d250b078c2040b203.mockapi.io/pizzaDirect/${id}` )
                console.log(data)
                setPizza(data)

            } catch (error) {
                alert('Ошибка при получении пиццы !')
            }
        }
        fetchPizza()
    }, [])

    if(!pizza){
      return <>Загрузка ...</>
    }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt = 'pizza' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza;
