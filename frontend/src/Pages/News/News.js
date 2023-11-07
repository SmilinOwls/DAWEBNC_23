import React from 'react'
import {Container, Row, Col} from 'reactstrap';
import "./News.css"
import NewsList from './NewsList';
const News = () => {
  return (
    <section className='news'>
        <section className="common_news">
            <Container>
                <Row>
                    <Col lg='12'>
                        <h2>Lastest News</h2>
                    </Col>
                </Row>
            </Container>
        </section>
        <Container>
            <div className='news__container'>
                <NewsList />
            </div>
        </Container>
    </section>
  )
}

export default News