import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getDetailSite} from '../../Actions/SitesAction'
import {Container, Row, Col} from 'reactstrap'
import PlacesInSite from './PlacesInSite';

const DetailSite = () => {
  const {id} = useParams();
  const {detailSite, isLoading} = useSelector((state) => state.detailSite);
  const dispatch = useDispatch();

  useEffect(() =>{
      dispatch(getDetailSite(id))
  }, [id]);
  console.log(detailSite)
  return (
    <section className='container'>
    <Container>
          <img 
              src={detailSite.photo}
              alt='sites'
              width="100%"
              className='h-[350px] mt-4'
          />
          
          <h2 className='text-lg-semi-bold lg:text-display-lg-semi-bold text-center mt-3'>{detailSite.name}</h2>
          <p className='text-md-regular mt-3'>{detailSite.text}</p>
          <p className='text-md-regular mt-2'>Famous tourist attractions at {detailSite.name}:</p>
          {
            detailSite.length !== 0 ? (detailSite.detailText.map((text, index) => (
               <div key={text._id}>
                  <p className='font-semibold'>{index + 1}. {text.title}</p>
                  <img src={text.photo} alt='scence' width="100%" className='h-[400px] mt-4'/>
                  <p className='text-md-regular mt-3'>{text.fullText}</p>
               </div>
            ))) : (
              <></>
            )
          }
        <Container>
          <Row>
            <Col lg='12'>
                  <div className='section__subtitle'>Feature Hotels</div>
            </Col>
            <PlacesInSite siteId={id}/>
          </Row>
        </Container>
      
        
    </Container>
    </section>
  )
}

export default DetailSite