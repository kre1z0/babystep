import React from 'react'
import { Link } from 'react-router'
// ➡ https://github.com/gaearon/react-document-title
import DocumentTitle from 'react-document-title'

function NotFound() {
  return (
    <DocumentTitle title='404 Ошибка' >
      <div className='container' >
        <div>404</div>
        <div>О нет! Страница которую вы искали не существует</div>
        <div >
          <Link to='/'>
            <span className='button__text' >Вернуться на главную</span>
          </Link>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default NotFound
