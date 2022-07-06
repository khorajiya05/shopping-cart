import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { fetchUsers } from '../features/produxtSlice'

export const FetchData = () => {
  const product = useAppSelector(state => state.product)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  return (
    <div>
      <h2>List of Users</h2>
      {product.loading && <div>Loading...</div>}
      {!product.loading && product.error ? <div>Error: {product.error}</div> : null}
      {!product.loading && product.products.length ? (
        <ul>
          {product.products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}